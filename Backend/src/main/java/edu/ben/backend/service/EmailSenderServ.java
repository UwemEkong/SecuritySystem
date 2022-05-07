package edu.ben.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;

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


    public void sendMotionEmail(String to, String subject, String from, String body, String fileToAttach)
    {
        MimeMessagePreparator preparator = new MimeMessagePreparator()
        {
            public void prepare(MimeMessage mimeMessage) throws Exception
            {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
                mimeMessage.setFrom(from);
                mimeMessage.setSubject(subject);

                String template = "<strong><div>%s   <img style=\"width:20px;\" src=\"%s\"></div><strong><br>"
                        + "<img src=\"%s\">";
                String icon = "https://cdn-icons-png.flaticon.com/128/3004/3004613.png";
                String content = String.format(template, body, icon, fileToAttach);
                mimeMessage.setContent
                        (content,
                                "text/html");
            }
        };

        try {
            mailSender.send(preparator);
        }
        catch (MailException ex) {
            // simply log it and go on...
            System.err.println(ex.getMessage());
        }
    }
}
