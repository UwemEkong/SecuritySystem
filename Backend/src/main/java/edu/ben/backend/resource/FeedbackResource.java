package edu.ben.backend.resource;

import edu.ben.backend.model.dto.feedbackDTO;
import edu.ben.backend.model.dto.userDTO;
import edu.ben.backend.model.feedback;
import edu.ben.backend.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/feedback", produces = "application/json")
class FeedbackResource {

    private final FeedbackService feedbackService;

    FeedbackResource(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/create")
    public void createEmployee(@RequestBody feedbackDTO feedbackDTO) {
        this.feedbackService.create(feedbackDTO);
    }

    @GetMapping("/getAllFeedback")
    public List<feedback> getAllFeedback() {
        return this.feedbackService.getAllFeedback();
    }

    @PostMapping("/editFeedback")
    public void editFeedback(@RequestBody feedbackDTO feedbackDTO) {
        this.feedbackService.editFeedback(feedbackDTO);
    }

}

