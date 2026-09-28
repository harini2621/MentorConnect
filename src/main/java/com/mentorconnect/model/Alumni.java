package com.mentorconnect.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Alumni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank
    private String department;

    @NotNull
    @Positive
    @Column(nullable = false)
    private Integer maxConcurrentMentees;

    @ManyToMany
    @JoinTable(
        name = "alumni_interest_tags",
        joinColumns = @JoinColumn(name = "alumni_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<InterestTag> expertiseTags = new HashSet<>();

    public Alumni() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getMaxConcurrentMentees() {
        return maxConcurrentMentees;
    }

    public void setMaxConcurrentMentees(Integer maxConcurrentMentees) {
        this.maxConcurrentMentees = maxConcurrentMentees;
    }

    public Set<InterestTag> getExpertiseTags() {
        return expertiseTags;
    }

    public void setExpertiseTags(Set<InterestTag> expertiseTags) {
        this.expertiseTags = expertiseTags;
    }
}