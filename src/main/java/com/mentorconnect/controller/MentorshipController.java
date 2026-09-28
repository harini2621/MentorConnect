package com.mentorconnect.controller;

import com.mentorconnect.model.Alumni;
import com.mentorconnect.model.MentorshipPair;
import com.mentorconnect.service.MentorshipService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorships")
public class MentorshipController {

    private final MentorshipService mentorshipService;

    public MentorshipController(
            MentorshipService mentorshipService) {
        this.mentorshipService = mentorshipService;
    }

    @GetMapping("/suggestions/{studentId}")
    public List<Alumni> getMentorSuggestions(
            @PathVariable Long studentId) {

        return mentorshipService
                .getMentorSuggestions(studentId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MentorshipPair createMentorship(
            @RequestParam Long studentId,
            @RequestParam Long alumniId) {

        return mentorshipService.createMentorship(
                studentId,
                alumniId
        );
    }

    @GetMapping
    public List<MentorshipPair> getAllMentorships() {
        return mentorshipService.getAllMentorships();
    }

    @GetMapping("/{id}")
    public MentorshipPair getMentorshipById(
            @PathVariable Long id) {

        return mentorshipService.getMentorshipById(id);
    }
}