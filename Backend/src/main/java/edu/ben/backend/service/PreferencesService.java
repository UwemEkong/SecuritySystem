package edu.ben.backend.service;

import edu.ben.backend.model.Label;
import edu.ben.backend.model.dto.preferencesDTO;
import edu.ben.backend.model.preferences;
import edu.ben.backend.repository.LabelRepository;
import edu.ben.backend.repository.PreferencesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class PreferencesService {

    PreferencesRepository preferencesRepository;
    LabelRepository labelRepository;
    AuthService authService;

    public PreferencesService(PreferencesRepository preferencesRepository, LabelRepository labelRepository, AuthService authService) {
        this.preferencesRepository = preferencesRepository;
        this.labelRepository = labelRepository;
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
    public void editPreferencesFontSize(preferencesDTO preferencesDTO) {
        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());
        preferences.setFontsize(preferencesDTO.getFontsize());
        preferencesRepository.save(preferences);
    }

    public void editPreferencesImageSize(preferencesDTO preferencesDTO) {
        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());
        preferences.setImagesize(preferencesDTO.getImagesize());
        preferencesRepository.save(preferences);
    }

    public void editPreferencesVideoSize(preferencesDTO preferencesDTO) {
        preferences preferences = preferencesRepository.findByuserid(preferencesDTO.getUserid());
        preferences.setVideosize(preferencesDTO.getVideosize());
        preferencesRepository.save(preferences);
    }



    public preferencesDTO getPreferences() {
        preferences preferences = preferencesRepository.findByuserid((long) authService.getLoggedInUser().getId().intValue());

        preferencesDTO preferencesDTO = new preferencesDTO(
                preferences.getUserid(), preferences.getRemove(), preferences.isMotion(), preferences.isDark(), preferences.getFontsize(), preferences.getImagesize(), preferences.getVideosize());

      return preferencesDTO;
    }

    public preferencesDTO getPreferences(Long userId) {
        preferences preferences = preferencesRepository.findByuserid(userId);

        return new preferencesDTO(userId, preferences.getRemove(), preferences.isMotion(), preferences.isDark(), preferences.getFontsize(), preferences.getImagesize(), preferences.getVideosize());

    }

    public List<Label> getLabels() {
        Long userid = authService.getLoggedInUser().getId();

        List<Label> labels = labelRepository.findAllByUserid(userid);

        return labels;
    }

    public void deleteLabel(String text) {
        Long userid = authService.getLoggedInUser().getId();
        Label l = labelRepository.findFirstByUseridAndText(userid, text);
        l.setUserid(0L);
        labelRepository.save(l);
        // There's an issue with line below, and stack overflow is down rn
        // so imma just set the label's userid to 0 until stack is up again
        // instead of actually deleting it
        //labelRepository.deleteByUseridAndText(userid,text);
    }

    public void addLabel(String text) {
        Long userid = authService.getLoggedInUser().getId();

        Label l = new Label(userid, text);
        labelRepository.save(l);
    }

}
