package com.interviewsimulator.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "questions")
public class Question {
    @Id
    private String id;
    
    @NotNull(message = "Category is required")
    private Category category;
    
    private String subcategory;
    
    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;
    
    private List<String> jobRoles;
    
    @NotBlank(message = "Question text is required")
    private String question;
    
    private List<String> followUpQuestions;
    private List<String> expectedAnswerPoints;
    
    @Min(value = 30, message = "Time limit must be at least 30 seconds")
    @Max(value = 1800, message = "Time limit must not exceed 30 minutes")
    private Integer timeLimit = 300; // Default 5 minutes
    
    private List<String> tags;
    
    private Boolean isActive = true;
    
    @Indexed
    private String createdBy;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    // Constructors
    public Question() {}
    
    public Question(Category category, Difficulty difficulty, String question) {
        this.category = category;
        this.difficulty = difficulty;
        this.question = question;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    
    public String getSubcategory() { return subcategory; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
    
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
    
    public List<String> getJobRoles() { return jobRoles; }
    public void setJobRoles(List<String> jobRoles) { this.jobRoles = jobRoles; }
    
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    
    public List<String> getFollowUpQuestions() { return followUpQuestions; }
    public void setFollowUpQuestions(List<String> followUpQuestions) { this.followUpQuestions = followUpQuestions; }
    
    public List<String> getExpectedAnswerPoints() { return expectedAnswerPoints; }
    public void setExpectedAnswerPoints(List<String> expectedAnswerPoints) { this.expectedAnswerPoints = expectedAnswerPoints; }
    
    public Integer getTimeLimit() { return timeLimit; }
    public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    // Enums
    public enum Category {
        TECHNICAL, BEHAVIORAL, HR, SITUATIONAL
    }
    
    public enum Difficulty {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}