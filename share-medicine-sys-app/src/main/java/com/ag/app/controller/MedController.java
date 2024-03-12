package com.ag.app.controller;

import com.ag.app.service.MedDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/medicines/search")
    public List<MedDataService.MedDataDTO> searchMedicines(@RequestParam String medicine_name) {
        return medDataService.searchMedicines(medicine_name);
    }
}
