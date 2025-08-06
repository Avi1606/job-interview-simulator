package com.interviewsimulator.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Indexed(unique = true)
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    @NotBlank(message = "First name is required")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    private String lastName;
    
    private String profilePicture;
    
    private Role role = Role.USER;
    
    private UserPreferences preferences;
    private UserStats stats;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Constructors
    public User() {
        this.preferences = new UserPreferences();
        this.stats = new UserStats();
    }
    
    public User(String email, String password, String firstName, String lastName) {
        this();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
    
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    
    public UserPreferences getPreferences() { return preferences; }
    public void setPreferences(UserPreferences preferences) { this.preferences = preferences; }
    
    public UserStats getStats() { return stats; }
    public void setStats(UserStats stats) { this.stats = stats; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Nested Classes
    public static class UserPreferences {
        private String jobRole;
        private Experience experience = Experience.INTERMEDIATE;
        private String[] focusAreas = {"technical", "behavioral"};
        
        public String getJobRole() { return jobRole; }
        public void setJobRole(String jobRole) { this.jobRole = jobRole; }
        
        public Experience getExperience() { return experience; }
        public void setExperience(Experience experience) { this.experience = experience; }
        
        public String[] getFocusAreas() { return focusAreas; }
        public void setFocusAreas(String[] focusAreas) { this.focusAreas = focusAreas; }
    }
    
    public static class UserStats {
        private Integer totalInterviews = 0;
        private Double averageScore = 0.0;
        private Double totalHours = 0.0;
        
        public Integer getTotalInterviews() { return totalInterviews; }
        public void setTotalInterviews(Integer totalInterviews) { this.totalInterviews = totalInterviews; }
        
        public Double getAverageScore() { return averageScore; }
        public void setAverageScore(Double averageScore) { this.averageScore = averageScore; }
        
        public Double getTotalHours() { return totalHours; }
        public void setTotalHours(Double totalHours) { this.totalHours = totalHours; }
    }
    
    // Enums
    public enum Role {
        USER, ADMIN
    }
    
    public enum Experience {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}