package com.mentorconnect.dto;

public class MentorshipReportResponse {

    private Long mentorshipPairId;
    private Long alumniId;
    private String alumniName;
    private Long studentId;
    private String studentName;
    private long totalSessions;
    private long completedSessions;
    private long scheduledSessions;
    private long cancelledSessions;

    public MentorshipReportResponse() {
    }

    public Long getMentorshipPairId() {
        return mentorshipPairId;
    }

    public void setMentorshipPairId(Long mentorshipPairId) {
        this.mentorshipPairId = mentorshipPairId;
    }

    public Long getAlumniId() {
        return alumniId;
    }

    public void setAlumniId(Long alumniId) {
        this.alumniId = alumniId;
    }

    public String getAlumniName() {
        return alumniName;
    }

    public void setAlumniName(String alumniName) {
        this.alumniName = alumniName;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public long getTotalSessions() {
        return totalSessions;
    }

    public void setTotalSessions(long totalSessions) {
        this.totalSessions = totalSessions;
    }

    public long getCompletedSessions() {
        return completedSessions;
    }

    public void setCompletedSessions(long completedSessions) {
        this.completedSessions = completedSessions;
    }

    public long getScheduledSessions() {
        return scheduledSessions;
    }

    public void setScheduledSessions(long scheduledSessions) {
        this.scheduledSessions = scheduledSessions;
    }

    public long getCancelledSessions() {
        return cancelledSessions;
    }

    public void setCancelledSessions(long cancelledSessions) {
        this.cancelledSessions = cancelledSessions;
    }
}