package edu.ben.backend.resource;


import edu.ben.backend.model.Comment;
import edu.ben.backend.model.dto.CommentDTO;
import edu.ben.backend.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/comment", produces = "application/json")
public class CommentResource {

    private final CommentService commentService;

    public CommentResource(CommentService commentService) {
        this.commentService = commentService;
    }
    @GetMapping("/getmediaxcomments/{mediaxId}")
    public List<CommentDTO> getMediaxComments(@PathVariable Long mediaxId) {
        return this.commentService.getMediaxComments(mediaxId);
    }

    @PostMapping("/createcomment")
    public void createComment(@RequestBody CommentDTO commentDTO) {
        this.commentService.createComment(commentDTO);
    }
}
