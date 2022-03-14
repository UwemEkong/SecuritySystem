package edu.ben.backend.service;

import edu.ben.backend.model.Mediax;
import edu.ben.backend.model.preferences;
import edu.ben.backend.repository.MediaxRepository;
import edu.ben.backend.repository.PreferencesRepository;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling
public class CleaningScheduler {

    PreferencesRepository preferencesRepository;
    MediaxRepository mediaxRepository;

    public CleaningScheduler(PreferencesRepository preferencesRepository, MediaxRepository mediaxRepository) {
        this.preferencesRepository = preferencesRepository;
        this.mediaxRepository = mediaxRepository;
    }

    @Scheduled(cron = "0 */1 * ? * *")
    public void oneMinuteClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 1) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 */5 * ? * *")
    public void fiveMinuteClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 5) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 */15 * ? * *")
    public void fifteenMinuteClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 15) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 */30 * ? * *")
    public void thirtyMinuteClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 30) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 0 * ? * *")
    public void sixtyMinuteClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 60) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 0 */3 ? * *")
    public void threeHoursClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 180) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 0 */6 ? * *")
    public void sixHoursClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 360) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 0 */12 ? * *")
    public void twelveHoursClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 720) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 0 12 * * ?")
    public void twentyFourHoursClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 1440) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }

    @Scheduled(cron = "0 0 12 1/2 * ?")
    public void fortyEightHoursClean() {
        List<preferences> preferences = preferencesRepository.findAll();
        List<Mediax> mediax = mediaxRepository.findAll();
        for (int i = 0; i < preferences.size(); i++) {
            if (preferences.get(i).getRemove() == 2880) {
                Long userid = preferences.get(i).getUserid();
                for (int j = 0; j < mediax.size(); j++) {
                    if (mediax.get(j).getUserid() == userid) {
                        mediaxRepository.delete(mediax.get(j));
                    }
                }

            }
        }
    }


}
