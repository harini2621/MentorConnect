package com.mentorconnect.repository;

import com.mentorconnect.model.MentorshipPair;
import com.mentorconnect.model.MentorshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorshipPairRepository
        extends JpaRepository<MentorshipPair, Long> {

    long countByAlumniIdAndStatus(
            Long alumniId,
            MentorshipStatus status
    );

    boolean existsByStudentIdAndStatus(
            Long studentId,
            MentorshipStatus status
    );

    List<MentorshipPair> findByAlumniId(Long alumniId);

    List<MentorshipPair> findByStudentId(Long studentId);
}