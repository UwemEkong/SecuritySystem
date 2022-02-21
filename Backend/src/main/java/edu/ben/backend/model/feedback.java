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
@Table(name = "feedback")
public class feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "name")
    String name;
    @Column(name = "email")
    String email;
    @Column(name = "question")
    String question;
    @Column(name = "sent")
    boolean sent;

    public feedback(String name, String email, String question, boolean sent) {
        this.name = name;
        this.email = email;
        this.question = question;
        this.sent = sent;
    }
}