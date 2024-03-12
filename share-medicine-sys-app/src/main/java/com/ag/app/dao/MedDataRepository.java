package com.ag.app.dao;

import com.ag.app.entity.MedDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedDataRepository extends JpaRepository<MedDataEntity, Integer> {
    @Query(value = "SELECT med FROM MedDataEntity med WHERE med.medicine_name LIKE %?1%")
    List<MedDataEntity> findByMedicineName(String medicine_name);
}
