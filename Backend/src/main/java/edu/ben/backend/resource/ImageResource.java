package edu.ben.backend.resource;

import edu.ben.backend.model.image;
import edu.ben.backend.service.ImageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/image", produces = "application/json")
class ImageResource {

    private final ImageService imageService;

    ImageResource(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/getAllImages")
    public List<image> getAllFeedback() {
        return this.imageService.getAllImages();
    }



}

