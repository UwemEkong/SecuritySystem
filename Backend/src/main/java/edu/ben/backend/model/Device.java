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
@Table(name = "device")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "userid")
    Long userid;
    @Column(name = "macaddress")
    String macaddress;
    @Column(name = "name", length = 500)
    String name;
    @Column(name = "location")
    String location;
    @Column(name = "active")
    boolean active;
    @Column(name = "defaultdevice")
    boolean defaultdevice;

    public Device(Long userId, String macaddress, String name, String location, boolean active, boolean defaultdevice) {
        this.userid = userId;
        this.macaddress = macaddress;
        this.name = name;
        this.location = location;
        this.active = active;
        this.defaultdevice = defaultdevice;
    }
}
