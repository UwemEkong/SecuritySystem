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
    int fontsize;
    int imagesize;
    int videosize;


    public preferencesDTO(Long userid, int remove, boolean motion, boolean dark, int fontsize, int imagesize, int videosize) {
        this.userid = userid;
        this.remove = remove;
        this.motion = motion;
        this.dark = dark;
        this.fontsize = fontsize;
        this.imagesize = imagesize;
        this.videosize = videosize;
    }

    public preferencesDTO(){}
    public preferencesDTO(int id) {
        this.id = id;
    }


}