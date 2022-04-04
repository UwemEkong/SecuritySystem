package edu.ben.backend.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "mediaid")
    Long mediaid;
    @Column(name = "content", length = 500)
    String content;
    @Column(name = "username")
    String username;
    @Column(name = "date")
    String date;

    public Comment(Long mediaid, String content, String username, String date) {
        this.mediaid = mediaid;
        this.content = content;
        this.username = username;
        this.date = date;
    }
}
