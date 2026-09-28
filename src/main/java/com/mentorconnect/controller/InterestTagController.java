package com.mentorconnect.controller;

import com.mentorconnect.model.InterestTag;
import com.mentorconnect.service.InterestTagService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class InterestTagController {

    private final InterestTagService interestTagService;

    public InterestTagController(
            InterestTagService interestTagService) {
        this.interestTagService = interestTagService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InterestTag createTag(
            @Valid @RequestBody InterestTag tag) {

        return interestTagService.createTag(tag);
    }

    @GetMapping
    public List<InterestTag> getAllTags() {
        return interestTagService.getAllTags();
    }

    @GetMapping("/{id}")
    public InterestTag getTagById(
            @PathVariable Long id) {

        return interestTagService.getTagById(id);
    }
}