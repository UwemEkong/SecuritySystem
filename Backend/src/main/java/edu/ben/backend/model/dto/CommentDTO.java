
package edu.ben.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    public CommentDTO(String content, String username, Long mediaid) {
        this.content = content;
        this.username = username;
        this.mediaid = mediaid;
    }

    public LocalDateTime getLocalDate() {
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm:ss");
        LocalDateTime date = LocalDateTime.parse(this.date, myFormatObj);
        System.out.println("DATE: " + date);
        return date;
    }

    public CommentDTO(){}

}