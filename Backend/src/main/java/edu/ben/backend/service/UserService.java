package edu.ben.backend.service;

import java.util.*;

import edu.ben.backend.model.user;
import edu.ben.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class UserService {



    @Autowired
    private UserRepository userRepository;


    public String forgotPassword(String email) {

        Optional<user> userOptional = Optional
                .ofNullable(userRepository.findByEmail(email));

        if (!userOptional.isPresent()) {
            return "Invalid email id.";
        }

        user User = userOptional.get();
        User.setReset_token(((generateToken())));
        System.out.println(User);
        User = userRepository.save(User);
        System.out.println(User);

        return User.getReset_token();
    }

    private String generateToken() {
        StringBuilder token = new StringBuilder();

        return token.append(UUID.randomUUID().toString())
                .append(UUID.randomUUID().toString()).toString();
    }

    public String resetPassword(Long userId, String password) {

        Optional<user> userOptional = Optional
                .ofNullable(userRepository.findById(userId));

        if (!userOptional.isPresent()) {
            return "Invalid token.";
        }



        user User = userOptional.get();

        User.setPassword(password);
        User.setReset_token(null);


        userRepository.save(User);

        return "Your password successfully updated.";
    }

}
