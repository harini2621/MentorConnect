package com.mentorconnect.service;

import com.mentorconnect.dto.MentorshipReportResponse;
import com.mentorconnect.exception.BusinessRuleException;
import com.mentorconnect.exception.ResourceNotFoundException;
import com.mentorconnect.model.MentorshipPair;
import com.mentorconnect.model.Session;
import com.mentorconnect.model.SessionStatus;
import com.mentorconnect.repository.MentorshipPairRepository;
import com.mentorconnect.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final MentorshipPairRepository mentorshipPairRepository;

    public SessionService(
            SessionRepository sessionRepository,
            MentorshipPairRepository mentorshipPairRepository) {

        this.sessionRepository = sessionRepository;
        this.mentorshipPairRepository = mentorshipPairRepository;
    }

    public Session scheduleSession(
            Long mentorshipPairId,
            LocalDateTime scheduledAt,
            String notes) {

        MentorshipPair pair =
                mentorshipPairRepository.findById(mentorshipPairId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mentorship pair not found with id: "
                                                + mentorshipPairId
                                ));

        Session session = new Session();

        session.setMentorshipPair(pair);
        session.setScheduledAt(scheduledAt);
        session.setStatus(SessionStatus.SCHEDULED);
        session.setNotes(notes);

        return sessionRepository.save(session);
    }

    public Session completeSession(Long sessionId) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Session not found with id: " + sessionId
                        ));

        if (session.getStatus() == SessionStatus.CANCELLED) {
            throw new BusinessRuleException(
                    "Cancelled session cannot be completed."
            );
        }

        session.setStatus(SessionStatus.COMPLETED);
        session.setCompletedAt(LocalDateTime.now());

        return sessionRepository.save(session);
    }

    public Session cancelSession(Long sessionId) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Session not found with id: " + sessionId
                        ));

        if (session.getStatus() == SessionStatus.COMPLETED) {
            throw new BusinessRuleException(
                    "Completed session cannot be cancelled."
            );
        }

        session.setStatus(SessionStatus.CANCELLED);

        return sessionRepository.save(session);
    }

    public List<Session> getSessionsByMentorship(
            Long mentorshipPairId) {

        return sessionRepository
                .findByMentorshipPairId(mentorshipPairId);
    }

    public long getCompletedSessionCount(
            Long mentorshipPairId) {

        return sessionRepository
                .countByMentorshipPairIdAndStatus(
                        mentorshipPairId,
                        SessionStatus.COMPLETED
                );
    }

    public MentorshipReportResponse getMentorshipReport(
            Long mentorshipPairId) {

        MentorshipPair pair =
                mentorshipPairRepository.findById(mentorshipPairId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mentorship pair not found with id: "
                                                + mentorshipPairId
                                ));

        long totalSessions =
                sessionRepository.countByMentorshipPairId(
                        mentorshipPairId
                );

        long completedSessions =
                sessionRepository.countByMentorshipPairIdAndStatus(
                        mentorshipPairId,
                        SessionStatus.COMPLETED
                );

        long scheduledSessions =
                sessionRepository.countByMentorshipPairIdAndStatus(
                        mentorshipPairId,
                        SessionStatus.SCHEDULED
                );

        long cancelledSessions =
                sessionRepository.countByMentorshipPairIdAndStatus(
                        mentorshipPairId,
                        SessionStatus.CANCELLED
                );

        MentorshipReportResponse report =
                new MentorshipReportResponse();

        report.setMentorshipPairId(pair.getId());

        report.setAlumniId(
                pair.getAlumni().getId()
        );

        report.setAlumniName(
                pair.getAlumni().getName()
        );

        report.setStudentId(
                pair.getStudent().getId()
        );

        report.setStudentName(
                pair.getStudent().getName()
        );

        report.setTotalSessions(totalSessions);

        report.setCompletedSessions(completedSessions);

        report.setScheduledSessions(scheduledSessions);

        report.setCancelledSessions(cancelledSessions);

        return report;
    }
}