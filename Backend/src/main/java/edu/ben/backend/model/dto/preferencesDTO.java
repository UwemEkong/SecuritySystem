package edu.ben.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class preferencesDTO {
    int id;
    Long userid;
    int remove;
    boolean motion;
    boolean dark;
    String labels;


    public preferencesDTO(Long userid, int remove, boolean motion, boolean dark, String labels) {
        this.userid = userid;
        this.remove = remove;
        this.motion = motion;
        this.dark = dark;
        this.labels = labels;
    }

    public preferencesDTO(){}
    public preferencesDTO(int id) {
        this.id = id;
    }


}