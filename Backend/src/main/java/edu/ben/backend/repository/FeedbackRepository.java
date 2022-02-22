package edu.ben.backend.repository;

import edu.ben.backend.model.feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<feedback, Long> {

    public feedback findByName(String name);
    public feedback findById(int id);


}