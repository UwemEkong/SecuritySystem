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
    int userid;
    int remove;
    boolean motion;
    boolean dark;


    public preferencesDTO(int userid, int remove, boolean motion, boolean dark) {
        this.userid = userid;
        this.remove = remove;
        this.motion = motion;
        this.dark = dark;
    }

    public preferencesDTO(){}
    public preferencesDTO(int id) {
        this.id = id;
    }


}