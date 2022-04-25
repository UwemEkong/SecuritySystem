package edu.ben.backend.repository;

import edu.ben.backend.model.Mediax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaxRepository extends JpaRepository<Mediax, Long> {

    public Mediax findByPathorkey(String pathorkey);
    public List<Mediax> findAll();
    public List<Mediax> findAllByUserid(Long id);
    List<Mediax> findAllByDeviceid(Long id);
    public List<Mediax> findAllBySharedTrue();

}