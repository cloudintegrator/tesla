package com.ag.app.dao;

import com.ag.app.entity.PickedMedDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickedMedDataRepository extends JpaRepository<PickedMedDataEntity, Integer> {
}
