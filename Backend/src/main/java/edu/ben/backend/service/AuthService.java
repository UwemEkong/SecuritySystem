package edu.ben.backend.service;

import edu.ben.backend.exceptions.*;
import edu.ben.backend.model.dto.userDTO;
import edu.ben.backend.model.user;
import edu.ben.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthService {

    UserRepository userRepository;
    userDTO loggedInUser;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public userDTO login(String username, String password) {
        user user = userRepository.findByUsername(username);
        System.out.println(user);
        if (user == null) {
            throw new UserNotFoundException();
        } else if (!user.getPassword().equals(password)) {
            throw new IncorrectPasswordException();
        } else {
            loggedInUser = new userDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getFirstname(), user.getLastname());
            System.out.println("Get logged1 = " + loggedInUser);
            return new userDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getFirstname(), user.getLastname());
        }
    }

    public void register(userDTO userDTO) {
        System.out.println("Registering: " + userDTO);
        user existingUser = userRepository.findByUsername(userDTO.getUsername());

        if (existingUser != null) {
            throw new DuplicateUsernameException();
        } else if (userDTO.getPassword().length() < 8) {
            throw new InvalidPasswordLengthException();
        } else if (!containsSpecialChar(userDTO.getPassword())) {
            throw new SpecialCharacterException();
        } else if (missingField(userDTO)) {
            throw new MissingFieldException();
        } else {
            System.out.println(userDTO);
            userRepository.save(new user(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail(), userDTO.getFirstname(), userDTO.getLastname()));
        }
    }

    private boolean missingField(userDTO userDTO) {
        if (userDTO.getUsername().equals("") || userDTO.getEmail().equals("") || userDTO.getFirstname().equals("") || userDTO.getLastname().equals("") || userDTO.getPassword().equals("")) {
            return true;
        }
        return false;
    }

    private boolean containsSpecialChar(String password) {
        Pattern p = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(password);
        return m.find();
    }

    public userDTO getLoggedInUser() {
        System.out.println(loggedInUser);

        return loggedInUser;
    }

    public void editUser(userDTO userDTO) {
        user user = userRepository.findByUsername(userDTO.getUsername());
        user edited = new user(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail(), userDTO.getFirstname(), userDTO.getLastname());
        loggedInUser = new userDTO(edited.getId(), edited.getUsername(), edited.getPassword(), edited.getEmail(), edited.getFirstname(), edited.getLastname());
        userRepository.save(edited);
    }
}
