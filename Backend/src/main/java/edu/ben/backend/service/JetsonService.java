package edu.ben.backend.service;

import java.io.IOException;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JetsonService {

    private static final String ARP_GET_IP_HW = "arp -a";
    private static String JETSON_MAC_ID = "34:13:e8:63:59:7a";
    public static void main(String[] args) throws SocketException {
        try {
            System.out.println("IP: " + getJetsonIP(ARP_GET_IP_HW ));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getJetsonIP(String cmd) throws IOException {
        Scanner s = new Scanner(Runtime.getRuntime().exec(cmd).getInputStream()).useDelimiter("\\A");
        String jetsonIP = "";
        while(s.hasNext()) {
            jetsonIP = findJetsonIP(s.nextLine().split(" "));
            if (!jetsonIP.equals("")) {
                return jetsonIP;
            }
        }
        return "";
    }

    private static String findJetsonIP(String[] arpData) {
       NetworkData networkData = processData(arpData);
       if (networkData.macId.equals(convertToUserOS(JETSON_MAC_ID))) {
           return networkData.ip;
       } else {
           return "";
       }
    }

    private static NetworkData processData(String[] data) {
        boolean seenIP = false;
        String regex = "^([0-9A-Fa-f]{2}[:-])"
                + "{5}([0-9A-Fa-f]{2})|"
                + "([0-9a-fA-F]{4}\\."
                + "[0-9a-fA-F]{4}\\."
                + "[0-9a-fA-F]{4})$";
        Pattern p = Pattern.compile(regex);
        String ip = "";
        for (String address : data) {
            Matcher m = p.matcher(address);
            if (!address.equals("") && address.contains(".") && !seenIP) {
                ip = address;
                seenIP = true;
            } else if (!address.equals("") && m.matches() && seenIP) {
                return new NetworkData(ip, convertToUserOS(address));
            }
        }
        return new NetworkData("","");
    }

    public static String convertToUserOS(String macId) {
        String os = System.getProperty("os.name");
        if (os.toLowerCase().contains("windows")) {
            macId = macId.replace(":", "-");
        }
        return macId;
    }
}

class NetworkData {
    String macId;
    String ip;
    public NetworkData(String ip, String macId) {
        this.ip = ip;
        this.macId = macId;
    }
}
