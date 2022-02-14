package edu.ben.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class feedbackDTO {
    int id;
    String name;
    String email;
    String question;
    boolean sent;

    public feedbackDTO(String name, String email, String question, boolean sent) {
        this.name = name;
        this.email = email;
        this.question = question;
        this.sent = sent;
    }

    public feedbackDTO(String name) {
        this.name = name;
    }
    public feedbackDTO(int id) {
        this.id = id;
    }
    public feedbackDTO(){}

}