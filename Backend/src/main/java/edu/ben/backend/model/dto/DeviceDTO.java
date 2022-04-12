package edu.ben.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class DeviceDTO {

    Long id;
    Long userid;
    String macaddress;
    String name;
    String location;
    boolean active;

    public DeviceDTO(){}

}
