package edu.ben.backend.repository;

import edu.ben.backend.model.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {

    public Label findByText(String label);
    public List<Label> findAllByUserid(Long id);
    public Label findFirstByUseridAndText(Long userid,String text);
    public void deleteByUseridAndText(Long userid, String text);
}