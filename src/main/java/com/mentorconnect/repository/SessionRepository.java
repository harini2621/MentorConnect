package com.mentorconnect.repository;

import com.mentorconnect.model.Session;
import com.mentorconnect.model.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository
        extends JpaRepository<Session, Long> {

    long countByMentorshipPairIdAndStatus(
            Long mentorshipPairId,
            SessionStatus status
    );

    List<Session> findByMentorshipPairId(
            Long mentorshipPairId
    );

    long countByMentorshipPairId(
            Long mentorshipPairId
    );
}