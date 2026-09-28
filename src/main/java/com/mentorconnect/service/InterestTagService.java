package com.mentorconnect.service;

import com.mentorconnect.exception.ResourceNotFoundException;
import com.mentorconnect.model.InterestTag;
import com.mentorconnect.repository.InterestTagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestTagService {

    private final InterestTagRepository interestTagRepository;

    public InterestTagService(
            InterestTagRepository interestTagRepository) {
        this.interestTagRepository = interestTagRepository;
    }

    public InterestTag createTag(InterestTag tag) {
        return interestTagRepository.save(tag);
    }

    public List<InterestTag> getAllTags() {
        return interestTagRepository.findAll();
    }

    public InterestTag getTagById(Long id) {
        return interestTagRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Interest tag not found with id: " + id
                        ));
    }
}