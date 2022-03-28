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
    @Column(name = "fontsize")
    int fontsize;
    @Column(name = "imagesize")
    int imagesize;
    @Column(name = "videosize")
    int videosize;

    public preferences(Long userid, int remove, boolean motion, boolean dark, int fontsize, int imagesize, int videosize) {
        this.userid = userid;
        this.remove = remove;
        this.motion = motion;
        this.dark = dark;
        this.labels = "person,car";
        this.fontsize = fontsize;
        this.imagesize = imagesize;
        this.videosize = videosize;
    }
}