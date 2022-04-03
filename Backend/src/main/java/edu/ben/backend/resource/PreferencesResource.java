package edu.ben.backend.resource;

import edu.ben.backend.model.Label;
import edu.ben.backend.model.dto.LabelDTO;
import edu.ben.backend.model.dto.MediaxDTO;
import edu.ben.backend.model.dto.preferencesDTO;
import edu.ben.backend.service.PreferencesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "api/preferences", produces = "application/json")
class PreferencesResource {

    private final PreferencesService preferencesService;

    PreferencesResource(PreferencesService preferencesService) {
        this.preferencesService = preferencesService;
    }

    @PostMapping("/editPreferences")
    public void editPreferences(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferences(preferencesDTO);
    }
        
    @PostMapping("/editPreferencesRemove")
    public void editPreferencesRemove(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferencesRemove(preferencesDTO);
    }
    @PostMapping("/editPreferencesDark")
    public void editPreferencesDark(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferencesDark(preferencesDTO);
    }
    @PostMapping("/editPreferencesMotion")
    public void editPreferencesMotion(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferencesMotion(preferencesDTO);
    }

    @PostMapping("/editPreferencesFontSize")
    public void editPreferencesFontSize(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferencesFontSize(preferencesDTO);
    }

    @PostMapping("/editPreferencesImageSize")
    public void editPreferencesImageSize(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferencesImageSize(preferencesDTO);
    }

    @PostMapping("/editPreferencesVideoSize")
    public void editPreferencesVideoSize(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferencesVideoSize(preferencesDTO);
    }

    @GetMapping("/getPreferences")
    public preferencesDTO getPreferences() {
        return this.preferencesService.getPreferences();
    }

    @GetMapping("/getPreferences/{userId}")
    public preferencesDTO getPreferences(@PathVariable Long userId) {
        return this.preferencesService.getPreferences(userId);
    }

    @GetMapping(value = "/getLabels")
    public List<Label> getLabels() {
        return this.preferencesService.getLabels();
    }

    @GetMapping(value = "/getLabelsList")
    public String getLabelsList() {
        return this.preferencesService.getLabelsList();
    }

    @PostMapping("/addLabel")
    public void addLabel(@RequestBody String text) {
        System.out.println("ADDDDDINNNNGGGGG");
        this.preferencesService.addLabel(text);
    }

    @PostMapping("/deleteLabel")
    public void deleteLabel(@RequestBody String text) {
        this.preferencesService.deleteLabel(text);
    }

}

