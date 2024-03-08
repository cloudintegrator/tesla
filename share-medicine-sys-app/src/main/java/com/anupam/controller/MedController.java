package com.anupam.controller;

import com.ag.app.service.MedDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MedController {

    @Autowired
    MedDataService medDataService;

    @GetMapping("/health")
    public String sayHello() {
        return "I am up & running";
    }

    @GetMapping("/medicines")
    public List<MedDataService.MedDataDTO> getMedicines() {
        return medDataService.getMedicines();
    }
}
