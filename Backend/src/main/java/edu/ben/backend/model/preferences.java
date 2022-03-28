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
@Table(name = "preferences")
public class preferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "userid")
    Long userid;
    @Column(name = "remove")
    int remove;
    @Column(name = "motion")
    boolean motion;
    @Column(name = "dark")
    boolean dark;
    @Column(name = "labels")
    String labels;

    public preferences(Long userid, int remove, boolean motion, boolean dark) {
        this.userid = userid;
        this.remove = remove;
        this.motion = motion;
        this.dark = dark;
        this.labels = "person,car";
    }
}