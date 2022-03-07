package edu.ben.backend.resource;

import edu.ben.backend.model.Mediax;
import edu.ben.backend.model.dto.MediaxDTO;
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

    @GetMapping("/getUserMediax")
    public List<MediaxDTO> getUserMediax() {
        return this.mediaxService.getUserMediax();
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

}
