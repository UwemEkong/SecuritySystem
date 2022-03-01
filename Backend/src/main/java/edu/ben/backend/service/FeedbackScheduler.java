package edu.ben.backend.service;

import edu.ben.backend.model.feedback;
import edu.ben.backend.repository.FeedbackRepository;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling
public class FeedbackScheduler {

    FeedbackRepository feedbackRepository;
    EmailSenderServ eMailService;

    public FeedbackScheduler(FeedbackRepository feedbackRepository, EmailSenderServ eMailService) {
        this.feedbackRepository = feedbackRepository;
        this.eMailService = eMailService;
    }

    @Scheduled(cron = "*/30 * * * * *")
    public void SendFeedbackToMailBox()
    {
        List<feedback> feedback = feedbackRepository.findAll();

        for  (int i = 0; i < feedback.size(); i++) {
            if (!feedback.get(i).isSent()) {
                eMailService.sendEmail(
                        "bigbroscap101@gmail.com",
                        "bigbroscap101@gmail.com",
                        "Question From " + feedback.get(i).getName(),
                        feedback.get(i).getQuestion() + "\nPlease reply back to me at: " + feedback.get(i).getEmail());


                feedback feedbackUpdate = feedback.get(i);
                feedbackUpdate.setName(feedback.get(i).getName());
                feedbackUpdate.setEmail(feedback.get(i).getEmail());
                feedbackUpdate.setQuestion(feedback.get(i).getQuestion());
                feedbackUpdate.setSent(true);
                feedbackRepository.save(feedbackUpdate);
            }
        }
    }




}
