package edu.ben.backend.service;
import edu.ben.backend.model.dto.preferencesDTO;
import edu.ben.backend.model.preferences;
import edu.ben.backend.repository.PreferencesRepository;
import org.springframework.stereotype.Service;


@Service
public class PreferencesService {

    PreferencesRepository preferencesRepository;

    public PreferencesService(PreferencesRepository preferencesRepository) {
        this.preferencesRepository = preferencesRepository;
    }

    public void editPreferences(preferencesDTO preferencesDTO) {

        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());

        preferences.setRemove(preferencesDTO.getRemove());
        preferences.setMotion(preferencesDTO.isMotion());
        preferences.setDark(preferencesDTO.isDark());

        preferencesRepository.save(preferences);

    }


    public preferencesDTO getPreferences(Long userId) {
        preferences preferences = preferencesRepository.findByuserid(userId);
        return new preferencesDTO(userId, preferences.getRemove(), preferences.isMotion(), preferences.isDark());
    }
}
