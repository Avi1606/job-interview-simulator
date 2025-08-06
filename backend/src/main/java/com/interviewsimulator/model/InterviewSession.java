package com.interviewsimulator.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "interview_sessions")
public class InterviewSession {
    @Id
    private String id;
    
    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;
    
    private String title;
    
    @NotNull(message = "Interview type is required")
    private InterviewType type;
    
    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;
    
    private String jobRole;
    private String company;
    
    @NotNull(message = "Status is required")
    private Status status = Status.SCHEDULED;
    
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    
    private Integer duration; // in seconds
    
    private List<QuestionResponse> questions = new ArrayList<>();
    
    private RecordingInfo recordings;
    private SessionSettings settings;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Constructors
    public InterviewSession() {
        this.settings = new SessionSettings();
    }
    
    public InterviewSession(String userId, InterviewType type, Difficulty difficulty) {
        this();
        this.userId = userId;
        this.type = type;
        this.difficulty = difficulty;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public InterviewType getType() { return type; }
    public void setType(InterviewType type) { this.type = type; }
    
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
    
    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }
    
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    
    public List<QuestionResponse> getQuestions() { return questions; }
    public void setQuestions(List<QuestionResponse> questions) { this.questions = questions; }
    
    public RecordingInfo getRecordings() { return recordings; }
    public void setRecordings(RecordingInfo recordings) { this.recordings = recordings; }
    
    public SessionSettings getSettings() { return settings; }
    public void setSettings(SessionSettings settings) { this.settings = settings; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Nested Classes
    public static class QuestionResponse {
        private String questionId;
        private Integer order;
        private Integer timeSpent; // in seconds
        private String response;
        private Double confidence;
        
        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }
        
        public Integer getOrder() { return order; }
        public void setOrder(Integer order) { this.order = order; }
        
        public Integer getTimeSpent() { return timeSpent; }
        public void setTimeSpent(Integer timeSpent) { this.timeSpent = timeSpent; }
        
        public String getResponse() { return response; }
        public void setResponse(String response) { this.response = response; }
        
        public Double getConfidence() { return confidence; }
        public void setConfidence(Double confidence) { this.confidence = confidence; }
    }
    
    public static class RecordingInfo {
        private String videoUrl;
        private String audioUrl;
        private String thumbnailUrl;
        
        public String getVideoUrl() { return videoUrl; }
        public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
        
        public String getAudioUrl() { return audioUrl; }
        public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }
        
        public String getThumbnailUrl() { return thumbnailUrl; }
        public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    }
    
    public static class SessionSettings {
        private String videoQuality = "720p";
        private String audioQuality = "high";
        private Boolean practiceMode = true;
        
        public String getVideoQuality() { return videoQuality; }
        public void setVideoQuality(String videoQuality) { this.videoQuality = videoQuality; }
        
        public String getAudioQuality() { return audioQuality; }
        public void setAudioQuality(String audioQuality) { this.audioQuality = audioQuality; }
        
        public Boolean getPracticeMode() { return practiceMode; }
        public void setPracticeMode(Boolean practiceMode) { this.practiceMode = practiceMode; }
    }
    
    // Enums
    public enum InterviewType {
        TECHNICAL, BEHAVIORAL, HR, SITUATIONAL
    }
    
    public enum Difficulty {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
    
    public enum Status {
        SCHEDULED, IN_PROGRESS, PAUSED, COMPLETED
    }
}