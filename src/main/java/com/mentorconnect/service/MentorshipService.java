package com.mentorconnect.service;

import com.mentorconnect.exception.BusinessRuleException;
import com.mentorconnect.exception.ResourceNotFoundException;
import com.mentorconnect.model.Alumni;
import com.mentorconnect.model.InterestTag;
import com.mentorconnect.model.MentorshipPair;
import com.mentorconnect.model.MentorshipStatus;
import com.mentorconnect.model.Student;
import com.mentorconnect.repository.AlumniRepository;
import com.mentorconnect.repository.MentorshipPairRepository;
import com.mentorconnect.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MentorshipService {

    private final AlumniRepository alumniRepository;
    private final StudentRepository studentRepository;
    private final MentorshipPairRepository mentorshipPairRepository;

    public MentorshipService(
            AlumniRepository alumniRepository,
            StudentRepository studentRepository,
            MentorshipPairRepository mentorshipPairRepository) {

        this.alumniRepository = alumniRepository;
        this.studentRepository = studentRepository;
        this.mentorshipPairRepository = mentorshipPairRepository;
    }

    public List<Alumni> getMentorSuggestions(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + studentId
                        ));

        Set<Long> studentTagIds = student.getInterestTags()
                .stream()
                .map(InterestTag::getId)
                .collect(Collectors.toSet());

        List<Alumni> availableAlumni = alumniRepository.findAll()
                .stream()
                .filter(alumni -> {
                    long activeMentees =
                            mentorshipPairRepository
                                    .countByAlumniIdAndStatus(
                                            alumni.getId(),
                                            MentorshipStatus.ACTIVE
                                    );

                    return activeMentees
                            < alumni.getMaxConcurrentMentees();
                })
                .collect(Collectors.toList());

        availableAlumni.sort(
                Comparator.comparing(
                        (Alumni alumni) ->
                                calculateMatchingTags(
                                        alumni,
                                        studentTagIds
                                )
                ).reversed()
        );

        return availableAlumni;
    }

    private int calculateMatchingTags(
            Alumni alumni,
            Set<Long> studentTagIds) {

        return (int) alumni.getExpertiseTags()
                .stream()
                .map(InterestTag::getId)
                .filter(studentTagIds::contains)
                .count();
    }

    public MentorshipPair createMentorship(
            Long studentId,
            Long alumniId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + studentId
                        ));

        Alumni alumni = alumniRepository.findById(alumniId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Alumni not found with id: " + alumniId
                        ));

        boolean alreadyMentored =
                mentorshipPairRepository
                        .existsByStudentIdAndStatus(
                                studentId,
                                MentorshipStatus.ACTIVE
                        );

        if (alreadyMentored) {
            throw new BusinessRuleException(
                    "Student already has an active mentorship."
            );
        }

        long activeMentees =
                mentorshipPairRepository
                        .countByAlumniIdAndStatus(
                                alumniId,
                                MentorshipStatus.ACTIVE
                        );

        if (activeMentees >= alumni.getMaxConcurrentMentees()) {
            throw new BusinessRuleException(
                    "Mentor has reached the maximum concurrent mentee limit."
            );
        }

        MentorshipPair pair = new MentorshipPair();

        pair.setStudent(student);
        pair.setAlumni(alumni);
        pair.setStatus(MentorshipStatus.ACTIVE);
        pair.setCreatedAt(LocalDateTime.now());

        return mentorshipPairRepository.save(pair);
    }

    public List<MentorshipPair> getAllMentorships() {
        return mentorshipPairRepository.findAll();
    }

    public MentorshipPair getMentorshipById(Long id) {
        return mentorshipPairRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mentorship pair not found with id: " + id
                        ));
    }
}