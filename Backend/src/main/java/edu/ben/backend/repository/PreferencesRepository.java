package edu.ben.backend.repository;

import edu.ben.backend.model.preferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreferencesRepository extends JpaRepository<preferences, Long> {

    public preferences findByuserid(int userid);



}