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
@Table(name = "mediax")
public class Mediax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "userid")
    Long userid;
    //If the file is local file, then true, otherwise false, meaning it is stored in s3
    @Column(name = "islocal")
    boolean islocal;
    //If it is a video then true otherwise it is an image
    @Column(name = "isvideo")
    boolean isvideo;
    //if it's local then there will be local path, if it is stored in s3 then this is the aws object key
    @Column(name = "pathorkey")
    String pathorkey;
    @Column(name = "filename")
    String filename;
    @Column(name = "location")
    String location;
    @Column(name = "timestamp")
    String timestamp;
    @Column(name = "isfavorite")
    boolean isfavorite;
    @Column(name= "shared")
    boolean shared;
    @Column(name = "title")
    String title;
    @Column(name = "category")
    String category;
    @Column(name = "views")
    int views;
    @Column(name = "deviceid")
    Long deviceid;

    public Mediax(Long userid, boolean islocal, boolean isvideo, String pathorkey, String filename, String location, String timestamp, boolean isfavorite, boolean shared, String title, String category, int views, Long deviceid) {
        this.userid = userid;
        this.islocal = islocal;
        this.isvideo = isvideo;
        this.pathorkey = pathorkey;
        this.filename = filename;
        this.location = location;
        this.timestamp = timestamp;
        this.isfavorite = isfavorite;
        this.shared = shared;
        this.title = title;
        this.category = category;
        this.views = views;
        this.deviceid = deviceid;
    }

}