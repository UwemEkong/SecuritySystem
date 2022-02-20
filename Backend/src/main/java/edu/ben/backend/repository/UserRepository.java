package edu.ben.backend.repository;

import edu.ben.backend.model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<user, String> {

    public user findByUsername(String username);

   public user findByEmail(String email);

   public user findById(Long id);

}