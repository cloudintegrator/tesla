package com.ag.app.service;

import com.ag.app.dao.MedDataRepository;
import com.ag.app.dao.PickedMedDataRepository;
import com.ag.app.entity.MedDataEntity;
import com.ag.app.entity.PickedMedDataEntity;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PickedMedDataService {

    @Autowired
    private PickedMedDataRepository pickedMedDataRepository;

    @Autowired
    private MedDataRepository medDataRepository;

    @RabbitListener(queues = "PICK.MEDICINE.QUEUE")
    public void handleMessage(final MedDataService.MedDataDTO medDataDTO) {
        try {
            save(medDataDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void save(MedDataService.MedDataDTO medDataDTO) {
        try {
            // Deduct qty.
            MedDataEntity medDataEntity = medDataRepository.findById(medDataDTO.id()).get();
            Integer qty = medDataEntity.getMedicine_qty();
            qty = qty - medDataDTO.medicine_qty();
            medDataRepository.updateQtyById(medDataEntity.getId(), qty);

            // Save the picked medicine data.
            PickedMedDataEntity entity = new PickedMedDataEntity();
            entity.setEmail(medDataDTO.email());
            entity.setMedicine_name(medDataDTO.medicine_name());
            entity.setMedicine_qty(medDataDTO.medicine_qty());
            entity.setMedicine_validity(medDataDTO.medicine_validity());
            entity.setExpired(medDataDTO.expired());
            entity.setMsg(medDataDTO.msg());
            entity.setSend_to(medDataDTO.send_to());
            entity = pickedMedDataRepository.save(entity);
            System.out.println("Medicine pickup record created with id:" + entity.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<MedDataService.MedDataDTO> getMessages(String email) {
        List<PickedMedDataEntity> list = pickedMedDataRepository.findByEmail(email);
        List<MedDataService.MedDataDTO> result = new ArrayList<>();
        list.stream().forEach((item) -> {
            result.add(new MedDataService.MedDataDTO(item.getId(),
                    item.getEmail(),
                    new Date(),
                    item.getMedicine_name(),
                    item.getMedicine_qty(),
                    item.getMedicine_validity(),
                    item.getExpired(),
                    item.getMsg(),
                    item.getSend_to()));
        });
        return result;
    }

}
