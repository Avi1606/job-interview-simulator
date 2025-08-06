package com.interviewsimulator.repository;

import com.interviewsimulator.model.InterviewSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InterviewSessionRepository extends MongoRepository<InterviewSession, String> {
    
    List<InterviewSession> findByUserId(String userId);
    
    List<InterviewSession> findByUserIdOrderByCreatedAtDesc(String userId);
    
    List<InterviewSession> findByUserIdAndStatus(String userId, InterviewSession.Status status);
    
    List<InterviewSession> findByStatus(InterviewSession.Status status);
    
    List<InterviewSession> findByType(InterviewSession.InterviewType type);
    
    List<InterviewSession> findByUserIdAndType(String userId, InterviewSession.InterviewType type);
    
    @Query("{ 'userId': ?0, 'createdAt': { $gte: ?1, $lte: ?2 } }")
    List<InterviewSession> findByUserIdAndCreatedAtBetween(String userId, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("{ 'userId': ?0, 'status': 'COMPLETED' }")
    List<InterviewSession> findCompletedByUserId(String userId);
    
    long countByUserId(String userId);
    
    long countByUserIdAndStatus(String userId, InterviewSession.Status status);
}