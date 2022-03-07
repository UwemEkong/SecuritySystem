package edu.ben.backend.service;

import edu.ben.backend.exceptions.*;
import edu.ben.backend.model.dto.userDTO;
import edu.ben.backend.model.preferences;
import edu.ben.backend.model.user;
import edu.ben.backend.repository.PreferencesRepository;
import edu.ben.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthService {
    private Environment env;

    EmailSenderServ emailSenderService;
    UserService userService;
    UserRepository userRepository;
    PreferencesRepository preferencesRepository;
    userDTO loggedInUser;
    userDTO resetUser;
    userDTO userReset;
    String tokenNew;

    public AuthService(UserRepository userRepository, UserService userService, EmailSenderServ emailSenderService, Environment env, PreferencesRepository preferencesRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.emailSenderService = emailSenderService;
        this.env = env;
        this.preferencesRepository = preferencesRepository;
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
            userRepository.save(new user(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail(), userDTO.getFirstname(), userDTO.getLastname(), userService.generateToken()));
            preferencesRepository.save(new preferences(userRepository.findByUsername(userDTO.getUsername()).getId().intValue(), 0, true, false));
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
        user User = userRepository.findByUsername(userDTO.getUsername());
        System.out.println(User);
        User.setPassword(userDTO.getPassword());
        System.out.println(User);
        userRepository.save(User);
    }

    public userDTO passWordReset(String username, String resetToken) {
        System.out.println(resetToken);
        user user = userRepository.findByUsername(username);
        System.out.println(user);
        if (user == null) {
            throw new UserNotFoundException();
        } else if (!user.getReset_token().equals(resetToken)) {
                throw new IncorrectTokenException();
        } else {
            resetUser = new userDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getFirstname(), user.getLastname(), user.getReset_token());
            System.out.println("Get reset = " + resetUser);
            return new userDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getFirstname(), user.getLastname(), user.getReset_token());
        }
    }

    public userDTO sendEmail(String email) throws MessagingException, UnsupportedEncodingException {
        user user = userRepository.findByEmail(email);
        System.out.println(user);

        if (user == null) {
            throw new UserNotFoundException();
        } else
             tokenNew = userService.generateToken();
             user.setResetToken(tokenNew);
             userRepository.save(user);
             userReset = new userDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getFirstname(), user.getLastname(), user.getReset_token());
            System.out.println("Get reset = " + resetUser);
            String account = env.getProperty("spring.mail.username");
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(userReset.getEmail());
            mailMessage.setSubject("Your Password Reset Token");
            mailMessage.setFrom(account);
            mailMessage.setText("Here is your password reset token: " + userReset.getResetToken());

            // Send the email
            emailSenderService.sendEmail(mailMessage);

            System.out.println("Get reset = " + userReset);
            return new userDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getFirstname(), user.getLastname(), user.getReset_token());

    }
}

