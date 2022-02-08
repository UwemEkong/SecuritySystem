package edu.ben.backend.resource;

import edu.ben.backend.model.dto.userDTO;
import edu.ben.backend.service.AuthService;

import org.springframework.web.bind.annotation.*;

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
}

