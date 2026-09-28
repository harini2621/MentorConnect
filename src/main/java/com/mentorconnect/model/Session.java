package com.mentorconnect.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mentorship_pair_id", nullable = false)
    private MentorshipPair mentorshipPair;

    private LocalDateTime scheduledAt;

    private LocalDateTime completedAt;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    private String notes;

    public Session() {
    }

    public Long getId() {
        return id;
    }

    public MentorshipPair getMentorshipPair() {
        return mentorshipPair;
    }

    public void setMentorshipPair(MentorshipPair mentorshipPair) {
        this.mentorshipPair = mentorshipPair;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public SessionStatus getStatus() {
        return status;
    }

    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}