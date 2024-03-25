package com.ag.app.service;


import com.ag.app.dao.MedDataRepository;
import com.ag.app.entity.MedDataEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class MedDataService {
    static Logger logger = LoggerFactory.getLogger(MedDataService.class);
    @Autowired
    private MedDataRepository medDataRepository;

    @RabbitListener(queues = "MEDICINE.QUEUE")
    public void handleMessage(final MedDataDTO med) {
        try {
            MedDataEntity medDataEntity = new MedDataEntity();
            medDataEntity.setEmail(med.email);
            medDataEntity.setCreated(med.created);
            medDataEntity.setMedicine_name(med.medicine_name);
            medDataEntity.setMedicine_qty(med.medicine_qty);
            medDataEntity.setMedicine_validity(med.medicine_validity);
            medDataEntity.setExpired(med.expired);
            MedDataEntity res = medDataRepository.save(medDataEntity);
            logger.info(String.format("Successfully created record:%s", res.getId()));
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    @RabbitListener(queues = "DELETE.MEDICINE.QUEUE")
    public void handleDeleteMedicine(final MedDataDTO med) {
        try {
            medDataRepository.deleteById(med.id);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    public List<MedDataDTO> getMedicines() {
        List<MedDataEntity> list = medDataRepository.findByExpired(false);
        final List<MedDataDTO> result = new ArrayList<>();
        list.stream().forEach((item) -> {
            result.add(new MedDataDTO(item.getId(),
                    item.getEmail(),
                    item.getCreated(),
                    item.getMedicine_name(),
                    item.getMedicine_qty(),
                    item.getMedicine_validity(),
                    item.getExpired(), ""));
        });
        return result;
    }

    public List<MedDataDTO> searchMedicines(String medicine_name) {
        List<MedDataEntity> list = medDataRepository.findByMedicineName(medicine_name);
        final List<MedDataDTO> result = new ArrayList<>();
        list.stream().forEach((item) -> {
            result.add(new MedDataDTO(item.getId(),
                    item.getEmail(),
                    item.getCreated(),
                    item.getMedicine_name(),
                    item.getMedicine_qty(),
                    item.getMedicine_validity(),
                    item.getExpired(), ""));
        });
        return result;
    }

    public void updateExpiry() {
        List<MedDataEntity> list = medDataRepository.findAll();

        LocalDate currentDate = LocalDate.now();
        list.forEach((med) -> {
            LocalDate validity = Instant.ofEpochMilli(med.getMedicine_validity().getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
            if (currentDate.isAfter(validity)) {
                medDataRepository.updateExpiredById(med.getId(), true);
            }
            if (med.getMedicine_qty() <= 0) {
                medDataRepository.deleteById(med.getId());
            }
        });
    }

    public void deleteMedicine(Integer id) {
        try {
            medDataRepository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public record MedDataDTO(@JsonProperty("id") Integer id,
                             @JsonProperty("email") String email,
                             @JsonProperty("created") Date created,
                             @JsonProperty("medicine_name") String medicine_name,
                             @JsonProperty("medicine_qty") Integer medicine_qty,
                             @JsonProperty("medicine_validity") Date medicine_validity,
                             @JsonProperty("expired") Boolean expired,
                             @JsonProperty("msg") String msg) implements Serializable {

    }


}
