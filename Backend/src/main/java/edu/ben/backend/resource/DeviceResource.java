package edu.ben.backend.resource;

import edu.ben.backend.model.dto.DeviceDTO;
import edu.ben.backend.service.DeviceService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(value = "api/device", produces = "application/json")
public class DeviceResource {

    private final DeviceService deviceService;

    public DeviceResource(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/getJetsonIP/{macAddress}")
    public String getJetsonIP(@PathVariable String macAddress) throws IOException {
        System.out.println("MAC:" + macAddress);
        return this.deviceService.getJetsonIP(macAddress);
    }

    @GetMapping("/getJetsonIpByDeviceId/{deviceId}")
    public String getJetsonIpByDeviceId(@PathVariable Long deviceId) throws IOException {
        return this.deviceService.getJetsonIP(deviceId);
    }

    @GetMapping("/getAllUserDevices")
    public List<DeviceDTO> getAllUserDevices()  {
        return this.deviceService.getAllUserDevices();
    }

    @PostMapping("/createDevice")
    public void createDevice(@RequestBody DeviceDTO deviceDTO)  {
        this.deviceService.createDevice(deviceDTO);
    }

    @PutMapping("/editDevice")
    public void editDevice(@RequestBody DeviceDTO deviceDTO)  {
        this.deviceService.editDevice(deviceDTO);
    }

    @DeleteMapping("/deleteDevice/{deviceId}")
    public void deleteDevice(@PathVariable Long deviceId)  {
        this.deviceService.deleteDevice(deviceId);
    }

    @GetMapping("/getDefaultDevice")
    public DeviceDTO getDefaultDevice()  {
        return this.deviceService.getDefaultDevice();
    }
}
