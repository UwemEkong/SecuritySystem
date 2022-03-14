package edu.ben.backend.resource;

import edu.ben.backend.model.dto.userDTO;
import edu.ben.backend.service.AuthService;

import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "api/auth", produces = "application/json")
class AuthResource {

    private final AuthService authenticationService;


    AuthResource(AuthService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/login/{username}/{password}")
    public userDTO login(@PathVariable String username, @PathVariable String password) {
        return this.authenticationService.login(username, password);
    }

    @PostMapping("/register")
    public void createEmployee(@RequestBody userDTO userDTO) {

        this.authenticationService.register(userDTO);
    }

    @PostMapping("/edituser")
    public void editUser(@RequestBody userDTO userDTO) {

        this.authenticationService.editUser(userDTO);
    }

    @GetMapping("/getloggedinuser")
    public userDTO getLoggedInUser() {
        return this.authenticationService.getLoggedInUser();
    }

    @GetMapping("/forgot-password/{username}/{resetToken}")
    public userDTO getToken(@PathVariable String username, @PathVariable String resetToken) {

        return this.authenticationService.passWordReset(username, resetToken);
    }

    @GetMapping("/forgot-password/{email}")
    public userDTO sendToken(@PathVariable String email) throws MessagingException, UnsupportedEncodingException {

        return this.authenticationService.sendEmail(email);
    }

    @GetMapping("/report/{report}")
    public String reportWhatHasBeenDetected(@PathVariable String report){
        System.out.println("sending email reporting motion detected");
        this.authenticationService.emailWhatHasBeenDetected(report);
        return "success";
    }
}

