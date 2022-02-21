package edu.ben.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class userDTO {
    Long id;
    String username;
    String password;
    String email;
    String firstname;
    String lastname;
    String resetToken;

    public userDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public userDTO(String username) {
        this.username = username;
    }

    public userDTO(){}


    public userDTO(Long id, String username, String resetToken) {
        this.id = id;
        this.resetToken = resetToken;
        this.username = username;
    }

    public userDTO(Long id, String username, String password, String email, String firstname, String lastname) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstname =firstname;
        this.lastname = lastname;
    }

}