package com.ag.app.service;

import com.ag.app.dao.PickedMedDataRepository;
import com.ag.app.entity.PickedMedDataEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PickedMedDataService {

    @Autowired
    private PickedMedDataRepository repository;

    public void save(MedDataService.MedDataDTO medDataDTO) {
        PickedMedDataEntity entity = new PickedMedDataEntity();
        entity.setEmail(medDataDTO.email());
        entity.setMedicine_name(medDataDTO.medicine_name());
        entity.setMedicine_qty(medDataDTO.medicine_qty());
        entity.setMedicine_validity(medDataDTO.medicine_validity());
        entity.setExpired(medDataDTO.expired());
        repository.save(entity);
    }

}
