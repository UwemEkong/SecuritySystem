package edu.ben.backend.service;

import edu.ben.backend.model.Device;
import edu.ben.backend.model.NetworkData;
import edu.ben.backend.model.dto.DeviceDTO;
import edu.ben.backend.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DeviceService {
    private final String ARP_GET_IP_HW = "arp -a";
    private final DeviceRepository deviceRepository;
    private final AuthService authService;
    //private static String JETSON_MAC_ID = "34:13:e8:63:59:7a";

    public DeviceService(DeviceRepository deviceRepository, AuthService authService) {
        this.deviceRepository = deviceRepository;
        this.authService = authService;
    }
    public String getJetsonIP(String macAddress) throws IOException {
        Scanner s = new Scanner(Runtime.getRuntime().exec(ARP_GET_IP_HW).getInputStream()).useDelimiter("\\A");
        String jetsonIP = "";
        while(s.hasNext()) {
            jetsonIP = processIP(s.nextLine().split(" "), macAddress);
            if (!jetsonIP.equals("")) {
                return jetsonIP;
            }
        }
        return "";
    }

    public String getJetsonIP(Long deviceId) throws IOException {
        Device device = deviceRepository.getById(deviceId);
        Scanner s = new Scanner(Runtime.getRuntime().exec(ARP_GET_IP_HW).getInputStream()).useDelimiter("\\A");
        String jetsonIP = "";
        while(s.hasNext()) {
            jetsonIP = processIP(s.nextLine().split(" "), device.getMacaddress());
            if (!jetsonIP.equals("")) {
                return jetsonIP;
            }
        }
        return "";
    }

    public void createDevice(DeviceDTO deviceDTO) {
        this.deviceRepository.save(new Device(this.authService.loggedInUser.getId(), deviceDTO.getMacaddress(), deviceDTO.getName(), deviceDTO.getLocation(), deviceDTO.isActive()));
    }

    public List<DeviceDTO> getAllUserDevices() {
        List<Device> userDevices = this.deviceRepository.findAllByUserid(this.authService.loggedInUser.getId());
        List<DeviceDTO> userDevicesDTO = new ArrayList();
        for (Device d: userDevices) {
            userDevicesDTO.add(new DeviceDTO(d.getId(),d.getUserid(), d.getMacaddress(), d.getName(), d.getLocation(), d.isActive()));
        }
        return userDevicesDTO;
    }

    public void editDevice(DeviceDTO deviceDTO) {
        Device device = deviceRepository.getById(deviceDTO.getId());
        device.setName(deviceDTO.getName());
        device.setActive(deviceDTO.isActive());
        device.setMacaddress(deviceDTO.getMacaddress());
        device.setLocation(deviceDTO.getLocation());
        deviceRepository.save(device);
    }

    private static String processIP(String[] arpData,String macAddress) {
       NetworkData networkData = processData(arpData);
       if (networkData.macId.equals(convertToUserOS(macAddress))) {
           return networkData.ip;
       } else {
           return "";
       }
    }

    private static NetworkData processData(String[] data) {
        boolean seenIP = false;
        String regex = "^([0-9A-Fa-f]{2}[:-])"
                + "{5}([0-9A-Fa-f]{2})|"
                + "([0-9a-fA-F]{4}\\."
                + "[0-9a-fA-F]{4}\\."
                + "[0-9a-fA-F]{4})$";
        Pattern p = Pattern.compile(regex);
        String ip = "";
        for (String address : data) {
            Matcher m = p.matcher(address);
            if (!address.equals("") && address.contains(".") && !seenIP) {
                ip = address;
                seenIP = true;
            } else if (!address.equals("") && m.matches() && seenIP) {
                return new NetworkData(ip, convertToUserOS(address));
            }
        }
        return new NetworkData("","");
    }

    public static String convertToUserOS(String macId) {
        String os = System.getProperty("os.name");
        if (os.toLowerCase().contains("windows")) {
            macId = macId.replace(":", "-");
        }
        return macId;
    }



}
