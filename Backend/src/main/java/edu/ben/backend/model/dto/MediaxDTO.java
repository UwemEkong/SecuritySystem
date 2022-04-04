package edu.ben.backend.model.dto;

import edu.ben.backend.model.Mediax;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class MediaxDTO {
    Long id;
    Long userid;
    boolean islocal;
    boolean isvideo;
    String pathorkey;
    String filename;
    String location;
    String timestamp;
    String url;
    boolean isfavorite;
    boolean shared;
    String title;
    String category;
    int views;

    public MediaxDTO(Long userid, boolean islocal, boolean isvideo, String pathorkey, String filename, String location, String timestamp, boolean isfavorite, boolean shared, String title, String category, int views) {
        this.userid = userid;
        this.islocal = islocal;
        this.isvideo = isvideo;
        this.pathorkey = pathorkey;
        this.filename = filename;
        this.location = location;
        this.timestamp = timestamp;
        this.isfavorite = isfavorite;
        this.shared= shared;
        this.title = title;
        this.category = category;
        this.views = views;
    }

    public MediaxDTO(Long userid, boolean islocal, boolean isvideo, String pathorkey, String filename, String location, String timestamp, String url, boolean isfavorite) {
        this.userid = userid;
        this.islocal = islocal;
        this.isvideo = isvideo;
        this.pathorkey = pathorkey;
        this.filename = filename;
        this.location = location;
        this.timestamp = timestamp;
        this.url = url;
        this.isfavorite = isfavorite;

    }

    public MediaxDTO(Mediax mx, String path){
        this.userid = mx.getUserid();
        this.islocal = mx.isIslocal();
        this.isvideo = mx.isIsvideo();
        this.pathorkey = mx.getPathorkey();
        this.filename = mx.getFilename();
        this.location = mx.getLocation();
        this.timestamp = mx.getTimestamp();
        this.url = path;
        this.isfavorite = mx.isIsfavorite();
        this.shared = mx.isShared();
        this.title = mx.getTitle();
        this.category = mx.getCategory();
        this.views = mx.getViews();
        this.id = mx.getId();
    }

    public MediaxDTO(){}

}