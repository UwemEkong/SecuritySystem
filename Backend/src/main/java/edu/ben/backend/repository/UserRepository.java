package edu.ben.backend.repository;

import edu.ben.backend.model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<user, Long> {

    public user findByUsername(String username);

}