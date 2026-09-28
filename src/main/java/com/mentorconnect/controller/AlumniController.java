package com.mentorconnect.controller;

import com.mentorconnect.model.Alumni;
import com.mentorconnect.service.AlumniService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
public class AlumniController {

    private final AlumniService alumniService;

    public AlumniController(AlumniService alumniService) {
        this.alumniService = alumniService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Alumni registerAlumni(
            @Valid @RequestBody Alumni alumni) {

        return alumniService.registerAlumni(alumni);
    }

    @GetMapping
    public List<Alumni> getAllAlumni() {
        return alumniService.getAllAlumni();
    }

    @GetMapping("/{id}")
    public Alumni getAlumniById(@PathVariable Long id) {
        return alumniService.getAlumniById(id);
    }
}