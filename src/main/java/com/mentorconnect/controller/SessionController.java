package com.mentorconnect.controller;

import com.mentorconnect.dto.MentorshipReportResponse;
import com.mentorconnect.model.Session;
import com.mentorconnect.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Session scheduleSession(
            @RequestParam Long mentorshipPairId,
            @RequestParam LocalDateTime scheduledAt,
            @RequestParam(required = false) String notes) {

        return sessionService.scheduleSession(
                mentorshipPairId,
                scheduledAt,
                notes
        );
    }

    @PutMapping("/{id}/complete")
    public Session completeSession(
            @PathVariable Long id) {

        return sessionService.completeSession(id);
    }

    @PutMapping("/{id}/cancel")
    public Session cancelSession(
            @PathVariable Long id) {

        return sessionService.cancelSession(id);
    }

    @GetMapping("/mentorship/{mentorshipPairId}")
    public List<Session> getSessionsByMentorship(
            @PathVariable Long mentorshipPairId) {

        return sessionService
                .getSessionsByMentorship(mentorshipPairId);
    }

    @GetMapping("/mentorship/{mentorshipPairId}/completed-count")
    public long getCompletedSessionCount(
            @PathVariable Long mentorshipPairId) {

        return sessionService
                .getCompletedSessionCount(mentorshipPairId);
    }

    @GetMapping("/mentorship/{mentorshipPairId}/report")
    public MentorshipReportResponse getMentorshipReport(
            @PathVariable Long mentorshipPairId) {

        return sessionService
                .getMentorshipReport(mentorshipPairId);
    }
}