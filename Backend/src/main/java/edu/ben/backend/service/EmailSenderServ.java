package edu.ben.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServ {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String fromEmail, String toEmail, String emailSubject, String emailBody) {
        SimpleMailMessage email = new SimpleMailMessage();

        email.setFrom(fromEmail);
        email.setTo(toEmail);
        email.setSubject(emailSubject);
        email.setText(emailBody);

        mailSender.send(email);

        System.out.println("Email sent details: " +
                "\n" + fromEmail +
                "\n" + toEmail +
                "\n" + emailSubject +
                "\n" + emailBody);

    }

    public void sendEmail(SimpleMailMessage mailMessage) {
        mailSender.send(mailMessage);
        System.out.println("Email sent!");
    }
}
