package edu.ben.backend.resource;

import edu.ben.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "api/auth", produces = "application/json")
public class PasswordController {

    @Autowired
    private UserService userService;

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {

        String response = userService.forgotPassword(email);

        if (!response.startsWith("Invalid")) {
            response = "http://localhost:8080/reset-password?token=" + response;
        }
        return response;
    }

    @PutMapping("/reset-password")
    public String resetPassword(@RequestParam Long id,
                                @RequestParam String password) {

        return userService.resetPassword(id, password);
    }

}
