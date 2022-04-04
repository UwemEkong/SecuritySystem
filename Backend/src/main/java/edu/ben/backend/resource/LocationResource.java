package edu.ben.backend.resource;

import edu.ben.backend.model.dto.CommentDTO;
import edu.ben.backend.model.dto.LocationDTO;
import edu.ben.backend.service.CommentService;
import edu.ben.backend.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/location", produces = "application/json")
public class LocationResource {

    private final LocationService locationService;

    public LocationResource(LocationService locationService) {
        this.locationService = locationService;
    }

        @GetMapping("/getlocation")
        public LocationDTO getCurrentLocation() {
            return this.locationService.getLocation();
        }

        @PostMapping("/setlocation")
        public void setLocation(@RequestBody LocationDTO locationDTO) {
            System.out.println("set location" + locationDTO.toString());
            this.locationService.setLocation(locationDTO);
        }
    }

