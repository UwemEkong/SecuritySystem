package edu.ben.backend.service;

import edu.ben.backend.model.dto.preferencesDTO;
import edu.ben.backend.model.preferences;
import edu.ben.backend.repository.PreferencesRepository;
import org.springframework.stereotype.Service;


@Service
public class PreferencesService {

    PreferencesRepository preferencesRepository;
    AuthService authService;

    public PreferencesService(PreferencesRepository preferencesRepository, AuthService authService) {
        this.preferencesRepository = preferencesRepository;
        this.authService = authService;
    }

    public void editPreferencesRemove(preferencesDTO preferencesDTO) {
        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());
        preferences.setRemove(preferencesDTO.getRemove());
        preferencesRepository.save(preferences);
    }

    public void editPreferencesDark(preferencesDTO preferencesDTO) {
        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());
        preferences.setDark(preferencesDTO.isDark());
        preferencesRepository.save(preferences);
    }

    public void editPreferencesMotion(preferencesDTO preferencesDTO) {
        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());
        preferences.setMotion(preferencesDTO.isMotion());
        preferencesRepository.save(preferences);
    }


    public preferencesDTO getPreferences() {
        preferences preferences = preferencesRepository.findByuserid(authService.getLoggedInUser().getId().intValue());
        preferencesDTO preferencesDTO = new preferencesDTO(preferences.getUserid(), preferences.getRemove(), preferences.isMotion(), preferences.isDark());
        return preferencesDTO;
    }
}
