package edu.ben.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServ {
    @Autowired
    private JavaMailSender mailSender;

//    public void sendEmail(String toEMail, String subject, String fromEmail, String text) {
//
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setFrom(fromEmail);
//        mailMessage.setTo(toEMail);
//        mailMessage.setSubject(subject);
//        mailMessage.setText(text);
//
//        mailSender.send(mailMessage);
//
//        System.out.println("Email Sent Successfully!!");
//
//    }

    public void sendEmail(SimpleMailMessage mailMessage) {
        mailSender.send(mailMessage);
        System.out.println("Email sent!");
    }
}
