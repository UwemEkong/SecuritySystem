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
@Table(name = "label")
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "userid")
    Long userid;
    @Column(name = "text")
    String text;

    public Label(Long userid, String text) {
        this.userid = userid;
        this.text = text;
    }
}
