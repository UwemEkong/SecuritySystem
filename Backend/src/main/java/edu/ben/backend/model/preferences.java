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
    int userid;
    @Column(name = "remove")
    int remove;
    @Column(name = "motion")
    boolean motion;
    @Column(name = "dark")
    boolean dark;

    public preferences(int userid, int remove, boolean motion, boolean dark) {
        this.userid = userid;
        this.remove = remove;
        this.motion = motion;
        this.dark = dark;
    }
}