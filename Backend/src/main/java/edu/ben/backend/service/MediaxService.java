package edu.ben.backend.service;

import edu.ben.backend.model.Mediax;
import edu.ben.backend.model.dto.MediaxDTO;
import edu.ben.backend.model.user;
import edu.ben.backend.repository.MediaxRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import edu.ben.backend.GeneratePresignedURL;

@Service
public class MediaxService {

    MediaxRepository mediaxRepository;

    public MediaxService(MediaxRepository mediaxRepository) {
        this.mediaxRepository = mediaxRepository;
    }

    public List<MediaxDTO> getAllMediax(){
        List<Mediax> listOfMediax = mediaxRepository.findAll();
        System.out.println(listOfMediax);

        ArrayList<MediaxDTO> listofMediaxDTO = new ArrayList<MediaxDTO>();

        // Generate Presigned AWS urls from path or keys
        for(Mediax mx: listOfMediax){
            String path = "";
            if (!mx.isIslocal()){
                //if it on s3
                //change mediaxDTOs url to generated presigned url
                try {
                    path = GeneratePresignedURL.genPresignedURL("mainmediabucket", mx.getPathorkey());
                    System.out.println("path");
                    System.out.println(path);
                } catch (Exception e) {
                    System.out.println("shooooooooot, couldn't generate presigned url");
                }

            } else {
                // if the path is local then just set url to path
                path = mx.getPathorkey();
            }

            MediaxDTO mxdto = new MediaxDTO(mx, path);

            listofMediaxDTO.add(mxdto);
        }

        return listofMediaxDTO;
    }

    public void createMediax(MediaxDTO mediaxDTO) {
        System.out.println(mediaxDTO);
        mediaxRepository.save(new Mediax(mediaxDTO.getUserid(), mediaxDTO.isIslocal(), mediaxDTO.isIsvideo(), mediaxDTO.getPathorkey(), mediaxDTO.getFilename(), mediaxDTO.getLocation(), mediaxDTO.getTimestamp()));
    }
}
