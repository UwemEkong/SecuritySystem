package edu.ben.backend.model;

import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "user")
public class user {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "username")
    String username;
    @Column(name = "password")
    String password;
    @Column(name = "email")
    String email;
    @Column(name = "firstname")
    String firstname;
    @Column(name = "lastname")
    String lastname;
   @Column(name = "reset_token")
    String reset_token;

    public user(String username, String password, String email, String firstname, String lastname, String resetToken) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.reset_token = resetToken;
    }


    public user(String username, String password, String email, String firstname, String lastname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public user(String username, String resetToken) {
        this.username = username;
        this.reset_token = resetToken;
    }


    public user(String password) {
        this.password = password;
    }

    public String setReset_token() {
        return this.reset_token;
    }

    public void setResetToken(String tokenNew) {
        this.reset_token = tokenNew;
    }
}