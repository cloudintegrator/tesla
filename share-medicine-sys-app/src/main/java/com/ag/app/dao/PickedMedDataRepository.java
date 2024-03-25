package com.ag.app.dao;

import com.ag.app.entity.PickedMedDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PickedMedDataRepository extends JpaRepository<PickedMedDataEntity, Integer> {

    @Query(value = "SELECT med FROM PickedMedDataEntity med WHERE med.send_to =?1")
    List<PickedMedDataEntity> findByEmail(String send_to);
}
