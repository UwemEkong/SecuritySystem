package edu.ben.backend.repository;

import edu.ben.backend.model.image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<image, Long> {

    public image findById(int Id);

}