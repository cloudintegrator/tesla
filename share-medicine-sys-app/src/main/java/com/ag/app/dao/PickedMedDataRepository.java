package com.ag.app.dao;

import com.ag.app.entity.PickedMedDataEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PickedMedDataRepository extends JpaRepository<PickedMedDataEntity, Integer> {

    @Query(value = "SELECT med FROM PickedMedDataEntity med WHERE med.email =?1 AND med.deal =?2 ")
    List<PickedMedDataEntity> findByEmail(String email,Boolean deal);

    @Modifying
    @Transactional
    @Query(value = "UPDATE PickedMedDataEntity med SET med.deal = ?2 WHERE med.id = ?1")
    public void updateDeal(Integer id, Boolean deal);

    @Query(value = "SELECT med FROM PickedMedDataEntity med WHERE med.email =?1 AND med.med_id =?2")
    PickedMedDataEntity findByEmailAndMed(String email, Integer med_id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE PickedMedDataEntity med SET med.medicine_qty = ?2,med.msg = ?3 WHERE med.id = ?1")
    public void updateQtyMsg(Integer id, Integer qty, String msg);
}
