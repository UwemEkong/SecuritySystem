package edu.ben.backend.resource;

import edu.ben.backend.model.Mediax;
import edu.ben.backend.model.dto.MediaxDTO;
import edu.ben.backend.model.dto.preferencesDTO;
import edu.ben.backend.model.dto.userDTO;
import edu.ben.backend.service.MediaxService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/mediax", produces = "application/json")
public class MediaxResource {

    private final MediaxService mediaxService;

    MediaxResource(MediaxService mediaxService) {
        this.mediaxService = mediaxService;
    }

    @GetMapping("/getAllMediax")
    public List<MediaxDTO> getAllMediax() {
        return this.mediaxService.getAllMediax();
    }

    @GetMapping("/getAllSharedMediax")
    public List<MediaxDTO> getSharedMediax() {
        return this.mediaxService.getAllSharedMediax();
    }

    @GetMapping("/getAllSharedMediaxFiltered/{mileRadiusFilter}")
    public List<MediaxDTO> getSharedMediaxFiltered(@PathVariable int mileRadiusFilter) {
        return this.mediaxService.getAllSharedMediaxFiltered(mileRadiusFilter);
    }

    @GetMapping("/getUserMediax")
    public List<MediaxDTO> getUserMediax() {
        return this.mediaxService.getUserMediax();
    }

    @GetMapping("/getUserMediaxByDeviceId/{deviceId}")
    public List<MediaxDTO> getUserMediaxByDeviceId(@PathVariable String deviceId) {
        return this.mediaxService.getUserMediaxBydeviceId(deviceId);
    }

    @PostMapping("/createMediax")
    public void createMediax(@RequestBody MediaxDTO mediaxDTO) {

        this.mediaxService.createMediax(mediaxDTO);
    }

    @PostMapping("/deleteMediax")
    public void deleteMediax(@RequestBody MediaxDTO mediaxDTO) {
        this.mediaxService.deleteMediax(mediaxDTO);
    }

    @PostMapping("/editMediax")
    public void editMediax(@RequestBody MediaxDTO mediaxDTO) {
        this.mediaxService.editMediax(mediaxDTO);
    }

    @PostMapping("/editShared")
    public void editShared(@RequestBody MediaxDTO mediaxDTO) {
        this.mediaxService.editShared(mediaxDTO);
    }

    @PostMapping("/editViews")
    public void editViews(@RequestBody MediaxDTO mediaxDTO) {
        this.mediaxService.editViews(mediaxDTO);
    }


}
