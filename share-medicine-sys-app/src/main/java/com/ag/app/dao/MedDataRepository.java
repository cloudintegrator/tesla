package com.ag.app.dao;

import com.ag.app.entity.MedDataEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedDataRepository extends JpaRepository<MedDataEntity, Integer> {
    @Query(value = "SELECT med FROM MedDataEntity med WHERE med.medicine_name LIKE %?1%")
    List<MedDataEntity> findByMedicineName(String medicine_name);

    @Modifying
    @Transactional
    @Query(value = "UPDATE MedDataEntity med SET med.medicine_qty = ?2 WHERE med.id = ?1")
    void updateQtyById(Integer id, Integer medicine_qty);

    @Modifying
    @Transactional
    @Query(value = "UPDATE MedDataEntity med SET med.expired = ?2 WHERE med.id = ?1")
    void updateExpiredById(Integer id,Boolean expired);
}
