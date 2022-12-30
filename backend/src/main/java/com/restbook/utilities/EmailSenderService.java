package com.restbook.utilities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailSenderService {

    public static final String REGISTRATION_MESSAGES = "Ciao! \n Benvenuto in RestBook!";
    private static final String PASSWORD_RESET_MSG = "Ciao!\nQuesta è la tua password temporanea per accedere al tuo account. Devi cambiarla"
            + " dopo il primo login\n\n";

    private static final String ACCOUNT_DELETION = "Ciao, il tuo account è stato eliminato!\n";

    @Autowired
    public EmailSenderService(JavaMailSender sender) {
        mailSender = sender;
    }

    private static JavaMailSender mailSender;

    public static void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("restbookwebsite@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
        System.out.println("Email inviata!");
    }

    public static void sendPasswordResetEmail(String toEmail, String pwd) {
        sendEmail(toEmail, "Reset password dell'account RestBook", PASSWORD_RESET_MSG + pwd);
    }

    public static void sendAccountDeletedEmail(String email) {
        sendEmail(email, "RestBook account eliminato", ACCOUNT_DELETION);

    }

}
