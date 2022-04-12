
package edu.ben.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class CommentDTO {
    Long id;
    Long mediaid;
    String content;
    String username;
    String date;

    public CommentDTO(){}

}