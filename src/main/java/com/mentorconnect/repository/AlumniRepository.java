package com.mentorconnect.repository;

import com.mentorconnect.model.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlumniRepository
        extends JpaRepository<Alumni, Long> {
}