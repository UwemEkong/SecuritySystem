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

    @PostMapping("/editPreferences")
    public void editPreferences(@RequestBody preferencesDTO preferencesDTO) {
        this.preferencesService.editPreferences(preferencesDTO);
    }

    @GetMapping("/getPreferences/{userId}")
    public preferencesDTO getPreferences(@PathVariable Long userId) {
        return this.preferencesService.getPreferences(userId);
    }

}

