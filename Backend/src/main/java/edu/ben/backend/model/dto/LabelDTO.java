package edu.ben.backend.model.dto;


import edu.ben.backend.model.Label;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class LabelDTO {
    Long id;
    Long userid;
    String text;

    public LabelDTO(Long userid, String text){
        this.userid = userid;
        this.text = text;
    }
}
