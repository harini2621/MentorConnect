package com.mentorconnect.service;

import com.mentorconnect.exception.ResourceNotFoundException;
import com.mentorconnect.model.Alumni;
import com.mentorconnect.repository.AlumniRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumniService {

    private final AlumniRepository alumniRepository;

    public AlumniService(AlumniRepository alumniRepository) {
        this.alumniRepository = alumniRepository;
    }

    public Alumni registerAlumni(Alumni alumni) {
        return alumniRepository.save(alumni);
    }

    public List<Alumni> getAllAlumni() {
        return alumniRepository.findAll();
    }

    public Alumni getAlumniById(Long id) {
        return alumniRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Alumni not found with id: " + id
                        ));
    }
}