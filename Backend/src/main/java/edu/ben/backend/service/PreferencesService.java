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
    
     public void editPreferences(preferencesDTO preferencesDTO) {

        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());

        preferences.setRemove(preferencesDTO.getRemove());
        preferences.setMotion(preferencesDTO.isMotion());
        preferences.setDark(preferencesDTO.isDark());

        preferencesRepository.save(preferences);

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
        preferences preferences = preferencesRepository.findByuserid((long) authService.getLoggedInUser().getId().intValue());
        preferencesDTO preferencesDTO = new preferencesDTO(preferences.getUserid(), preferences.getRemove(), preferences.isMotion(), preferences.isDark());
        return preferencesDTO;
    }

    public preferencesDTO getPreferences(Long userId) {
        preferences preferences = preferencesRepository.findByuserid(userId);
        return new preferencesDTO(userId, preferences.getRemove(), preferences.isMotion(), preferences.isDark());

    }

}
