package edu.ben.backend.service;

import edu.ben.backend.model.image;
import edu.ben.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<image> getAllImages() {
        List<image> image = imageRepository.findAll();
        return image;
    }

}
