package edu.ben.backend.service;

import edu.ben.backend.model.Comment;
import edu.ben.backend.model.dto.CommentDTO;
import edu.ben.backend.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CommentService {

    CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    public List<CommentDTO> getMediaxComments(Long mediaxId) {
        List<Comment> commentsForMedia = commentRepository.findAllByMediaid(mediaxId);
        return createDTOList(commentsForMedia);
    }

    public void createComment(CommentDTO commentDTO) {
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm:ss");
        String formattedDate = myDateObj.format(myFormatObj);

        Comment comment = new Comment(commentDTO.getMediaid(), commentDTO.getContent(), commentDTO.getUsername(),formattedDate);
        commentRepository.save(comment);
    }

    public List<CommentDTO> createDTOList(List<Comment> comments) {
        List<CommentDTO> dtoList = new ArrayList();
        for (Comment comment: comments) {
            dtoList.add(new CommentDTO(comment.getId(), comment.getMediaid(), comment.getContent(), comment.getUsername(), comment.getDate()));
        }
        Collections.reverse(dtoList);
        return dtoList;
    }
}
