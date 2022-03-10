package edu.ben.backend.resource;

import edu.ben.backend.model.dto.preferencesDTO;
import edu.ben.backend.service.PreferencesService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "api/preferences", produces = "application/json")
class PreferencesResource {

    private final PreferencesService preferencesService;

    PreferencesResource(PreferencesService preferencesService) {
        this.preferencesService = preferencesService;
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

    @GetMapping("/getPreferences")
    public preferencesDTO getPreferences() {
        return this.preferencesService.getPreferences();
    }
}

