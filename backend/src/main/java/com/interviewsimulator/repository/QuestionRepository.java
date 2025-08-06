package com.interviewsimulator.repository;

import com.interviewsimulator.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    
    List<Question> findByCategory(Question.Category category);
    
    List<Question> findByDifficulty(Question.Difficulty difficulty);
    
    List<Question> findByCategoryAndDifficulty(Question.Category category, Question.Difficulty difficulty);
    
    List<Question> findByJobRolesContaining(String jobRole);
    
    List<Question> findByIsActiveTrue();
    
    @Query("{ 'category': ?0, 'difficulty': ?1, 'isActive': true }")
    List<Question> findActiveByCategoryAndDifficulty(Question.Category category, Question.Difficulty difficulty);
    
    @Query("{ 'tags': { $in: ?0 }, 'isActive': true }")
    List<Question> findActiveByTagsIn(List<String> tags);
    
    @Query("{ 'question': { $regex: ?0, $options: 'i' }, 'isActive': true }")
    List<Question> findActiveByQuestionContainingIgnoreCase(String searchTerm);
}