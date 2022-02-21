package edu.ben.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class imageDTO {
    int id;
    String url;

    public imageDTO(){}

    public imageDTO(String url) {
        this.url = url;
    }
}