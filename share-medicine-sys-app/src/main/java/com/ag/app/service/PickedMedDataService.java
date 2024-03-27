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
import java.util.Optional;

@Service
public class PickedMedDataService {

    @Autowired
    private PickedMedDataRepository pickedMedDataRepository;

    @Autowired
    private MedDataRepository medDataRepository;

    @RabbitListener(queues = "PICK.MEDICINE.QUEUE")
    public void handlePickMessage(final MedDataService.MedDataDTO medDataDTO) {
        try {
            save(medDataDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "APPROVE.MEDICINE.QUEUE")
    public void handleApproveMedicine(final MedDataService.MedDataDTO medDataDTO) {
        try {
            approveMedicine(medDataDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void save(MedDataService.MedDataDTO medDataDTO) {
        try {
            // Save the picked medicine.
            PickedMedDataEntity entity = new PickedMedDataEntity();
            entity.setEmail(medDataDTO.email());
            entity.setMedicine_name(medDataDTO.medicine_name());
            entity.setMedicine_qty(medDataDTO.medicine_qty());
            entity.setMedicine_validity(medDataDTO.medicine_validity());
            entity.setExpired(medDataDTO.expired());
            entity.setMsg(medDataDTO.msg());
            entity.setSend_to(medDataDTO.send_to());
            entity.setMed_id(medDataDTO.id());
            entity.setDeal(false);
            entity = pickedMedDataRepository.save(entity);
            System.out.println("Medicine pickup record created with id:" + entity.getId());

            // Deduct qty.
            MedDataEntity medDataEntity = medDataRepository.findById(medDataDTO.id()).get();
            Integer qty = medDataEntity.getMedicine_qty();
            qty = qty - medDataDTO.medicine_qty();
            medDataRepository.updateQtyById(medDataEntity.getId(), qty);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<MedDataService.MedDataDTO> getMessages(String email) {
        List<PickedMedDataEntity> list = pickedMedDataRepository.findByEmail(email, false);
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

    public void approveMedicine(MedDataService.MedDataDTO medDataDTO) {
        // Cancel
        if ("CANCEL".equalsIgnoreCase(medDataDTO.msg())) {
            MedDataEntity medDataEntity = medDataRepository.findById(medDataDTO.id()).get();
            Integer qty = medDataEntity.getMedicine_qty();
            qty = qty + medDataDTO.medicine_qty();
            medDataRepository.updateQtyById(medDataEntity.getId(), qty);
        } else {
            Optional<PickedMedDataEntity> entity = pickedMedDataRepository.findById(medDataDTO.id());
            pickedMedDataRepository.updateDeal(entity.get().getId(), true);
        }

    }

}
