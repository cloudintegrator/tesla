package com.ag.app.controller;

import com.ag.app.service.MedDataService;
import com.ag.app.service.PickedMedDataService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MedController {

    @Autowired
    MedDataService medDataService;
    @Autowired
    PickedMedDataService pickedMedDataService;

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

    @PostMapping("/medicines/pick")
    public Response pick(@RequestBody MedDataService.MedDataDTO payload) {
        pickedMedDataService.save(payload);
        return new Response(201, "Success");
    }

    @PatchMapping("/medicines")
    public Response updateExpiry() {
        medDataService.updateExpiry();
        return new Response(201, "Success");
    }

    public record Response(@JsonProperty Integer code, @JsonProperty String message) {
    }

}
