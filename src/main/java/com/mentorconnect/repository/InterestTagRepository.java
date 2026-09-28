package com.mentorconnect.repository;

import com.mentorconnect.model.InterestTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InterestTagRepository
        extends JpaRepository<InterestTag, Long> {

    Optional<InterestTag> findByName(String name);
}