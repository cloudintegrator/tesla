package com.anupam.dao;

import com.ag.app.entity.MedDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedDataRepository extends JpaRepository<MedDataEntity, Integer> {
}
