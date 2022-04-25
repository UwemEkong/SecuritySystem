package edu.ben.backend.service;

import edu.ben.backend.model.Mediax;
import edu.ben.backend.model.dto.MediaxDTO;
import edu.ben.backend.model.dto.preferencesDTO;
import edu.ben.backend.model.preferences;
import edu.ben.backend.model.user;
import edu.ben.backend.repository.MediaxRepository;
import edu.ben.backend.service.AuthService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import edu.ben.backend.GeneratePresignedURL;

@Service
public class MediaxService {

    MediaxRepository mediaxRepository;
    AuthService authService;
    LocationService locationService;

    public MediaxService(MediaxRepository mediaxRepository, AuthService authService, LocationService locationService) {

        this.mediaxRepository = mediaxRepository;
        this.authService = authService;
        this.locationService = locationService;
    }

    private ArrayList<MediaxDTO> assignAWSURLs( List<Mediax> listOfMediax){

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

    public List<MediaxDTO> getAllMediax(){
        List<Mediax> listOfMediax = mediaxRepository.findAll();
        System.out.println(listOfMediax.toString());

        ArrayList<MediaxDTO> listofMediaxDTO = assignAWSURLs(listOfMediax);

        return listofMediaxDTO;
    }

    public List<MediaxDTO> getUserMediaxBydeviceId(String deviceId) {
        Long id = Long.parseLong(deviceId);
        List<Mediax> listOfMediax = mediaxRepository.findAllByDeviceid(id);
        ArrayList<MediaxDTO> listofMediaxDTO = assignAWSURLs(listOfMediax);
        return listofMediaxDTO;
    }

    public List<MediaxDTO> getAllSharedMediax() {
        return assignAWSURLs(mediaxRepository.findAllBySharedTrue());
    }

    public List<MediaxDTO> getAllSharedMediaxFiltered(int mileRadiusFilter) {
        return assignAWSURLs(locationService.filterByMileRadius(mediaxRepository.findAllBySharedTrue(), mileRadiusFilter));
    }

    public ArrayList<MediaxDTO> getUserMediax(){
        return assignAWSURLs(mediaxRepository.findAllByUserid(authService.getLoggedInUser().getId()));
    }

    public void createMediax(MediaxDTO mediaxDTO) {
        System.out.println(mediaxDTO);
        mediaxRepository.save(new Mediax(authService.loggedInUser.getId(), mediaxDTO.isIslocal(), mediaxDTO.isIsvideo(), mediaxDTO.getPathorkey(), mediaxDTO.getFilename(), mediaxDTO.getLocation(), mediaxDTO.getTimestamp(), mediaxDTO.isIsfavorite(), mediaxDTO.isShared(), mediaxDTO.getTitle(), mediaxDTO.getCategory(), mediaxDTO.getViews(), mediaxDTO.getDeviceid()));
    }

    public void deleteMediax(MediaxDTO mediaxDTO) {

        Mediax mediaxDelete = mediaxRepository.findByPathorkey(mediaxDTO.getPathorkey());
        mediaxRepository.delete(mediaxDelete);

        GeneratePresignedURL.deleteFromS3("mainmediabucket", mediaxDTO.getPathorkey());
    }

    public void deleteMediaxById(Long mediaxId) {
    }

    public void editMediax(MediaxDTO mediaxDTO) {
        System.out.println("editing mediax");
        Mediax mx = mediaxRepository.findByPathorkey(mediaxDTO.getPathorkey());
        mx.setFilename(mediaxDTO.getFilename());
        mx.setIsfavorite(mediaxDTO.isIsfavorite());
        mediaxRepository.save(mx);

    }

    public void editShared(MediaxDTO mediaxDTO) {
        System.out.println("editing mediax");
        Mediax mx = mediaxRepository.findByPathorkey(mediaxDTO.getPathorkey());
        mx.setShared(!mx.isShared());
        mx.setShared(mediaxDTO.isShared());
        mx.setTitle(mediaxDTO.getTitle());
        mx.setCategory(mediaxDTO.getCategory());
        System.out.println("category" + mediaxDTO.getCategory());
        System.out.println("title" + mediaxDTO.getTitle());
        System.out.println("Shared dto" + mediaxDTO.isShared());
        System.out.println("Shared regular" + mx.isShared());
        mediaxRepository.save(mx);
    }

    public void editViews(MediaxDTO mediaxDTO) {
        System.out.println("editing mediax");
        Mediax mx = mediaxRepository.findByPathorkey(mediaxDTO.getPathorkey());
        mx.setViews(mx.getViews() + 1);
        mediaxRepository.save(mx);
    }


}
