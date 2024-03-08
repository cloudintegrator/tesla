package com.ag.app.service;


import com.ag.app.dao.MedDataRepository;
import com.ag.app.entity.MedDataEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.catalina.LifecycleState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class MedDataService {
    static Logger logger = LoggerFactory.getLogger(MedDataService.class);
    @Autowired
    private MedDataRepository medDataRepository;

    public record MedDataDTO(@JsonProperty("id") Integer id,
                             @JsonProperty("email") String email,
                             @JsonProperty("created") Date created,
                             @JsonProperty("medicine_name") String medicine_name,
                             @JsonProperty("medicine_qty") Integer medicine_qty,
                             @JsonProperty("medicine_validity") Date medicine_validity) implements Serializable {

    }

    @RabbitListener(queues = "MEDICINE.QUEUE")
    public void handleMessage(final MedDataDTO med) {
        try {
            MedDataEntity medDataEntity = new MedDataEntity();
            medDataEntity.setEmail(med.email);
            medDataEntity.setCreated(med.created);
            medDataEntity.setMedicine_name(med.medicine_name);
            medDataEntity.setMedicine_qty(med.medicine_qty);
            medDataEntity.setMedicine_validity(med.medicine_validity);
            MedDataEntity res = medDataRepository.save(medDataEntity);
            logger.info(String.format("Successfully created record:%s", res.getId()));
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    public List<MedDataDTO> getMedicines() {
        List<MedDataEntity> list = medDataRepository.findAll();
        final List<MedDataDTO> result = new ArrayList<>();
        list.stream().forEach((item) -> {
            result.add(new MedDataDTO(item.getId(),
                    item.getEmail(),
                    item.getCreated(),
                    item.getMedicine_name(),
                    item.getMedicine_qty(),
                    item.getMedicine_validity()));
        });
        return result;
    }


}
