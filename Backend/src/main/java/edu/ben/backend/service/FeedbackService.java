package edu.ben.backend.service;

import edu.ben.backend.model.dto.feedbackDTO;
import edu.ben.backend.model.feedback;
import edu.ben.backend.repository.FeedbackRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class FeedbackService {

    FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public void create(feedbackDTO feedbackDTO) {
        System.out.println("Creating: " + feedbackDTO);
        feedbackRepository.save(new feedback(feedbackDTO.getName(), feedbackDTO.getEmail(), feedbackDTO.getQuestion(), feedbackDTO.isSent()));
    }

    public List<feedback> getAllFeedback() {
        List<feedback> feedback = feedbackRepository.findAll();
        return feedback;
    }

    public void editFeedback(feedbackDTO feedbackDTO) {
        feedback feedback = feedbackRepository.findById(feedbackDTO.getId());
        feedback.setName(feedbackDTO.getName());
        feedback.setEmail(feedbackDTO.getEmail());
        feedback.setQuestion(feedbackDTO.getQuestion());
        feedback.setSent(true);
        feedbackRepository.save(feedback);
    }






}
