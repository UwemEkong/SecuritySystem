package edu.ben.backend.model;

public class NetworkData {
    public String macId;
    public String ip;
    public NetworkData(String ip, String macId) {
        this.ip = ip;
        this.macId = macId;
    }
}
