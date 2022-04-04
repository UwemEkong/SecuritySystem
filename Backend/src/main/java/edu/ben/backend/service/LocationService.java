package edu.ben.backend.service;

import edu.ben.backend.model.Mediax;
import edu.ben.backend.model.dto.LocationDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService {
    LocationDTO currentUserCoordinates;

    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                                Math.sin(dLon/2) * Math.sin(dLon/2)
                ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        d = d * 0.621371 ; // Distance in mi
        return d;
    }

    public double deg2rad(double deg) {
        return deg * (Math.PI/180);
    }

    public LocationDTO getLocation() {
        return this.currentUserCoordinates;
    }

    public void setLocation(LocationDTO locationDTO) {
        this.currentUserCoordinates = locationDTO;
    }

    public double getCoordinate(String location, int idx) {
        String[] locationData = location.split(",");
        return Double.parseDouble(locationData[idx]);
    }

    public List<Mediax> filterByMileRadius(List<Mediax> allSharedMediax, int mileRadiusFilter) {
        List<Mediax> mediaxWithinRadius = new ArrayList();

        for (Mediax mediax: allSharedMediax) {
           double distanceToMediax = calculateDistance(this.currentUserCoordinates.getLat(), this.currentUserCoordinates.getLng(), getCoordinate(mediax.getLocation(), 2), getCoordinate(mediax.getLocation(), 3));
           if (distanceToMediax <= mileRadiusFilter) {
               mediaxWithinRadius.add(mediax);
           }
        }
        return mediaxWithinRadius;
    }
}
