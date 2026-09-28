package com.mentorconnect.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class MentorshipPair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "alumni_id", nullable = false)
    private Alumni alumni;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Enumerated(EnumType.STRING)
    private MentorshipStatus status;

    private LocalDateTime createdAt;

    public MentorshipPair() {
    }

    public Long getId() {
        return id;
    }

    public Alumni getAlumni() {
        return alumni;
    }

    public void setAlumni(Alumni alumni) {
        this.alumni = alumni;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public MentorshipStatus getStatus() {
        return status;
    }

    public void setStatus(MentorshipStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}