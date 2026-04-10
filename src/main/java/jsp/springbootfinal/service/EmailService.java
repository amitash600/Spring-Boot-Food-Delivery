package jsp.springbootfinal.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String resetToken, String customerName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request - Food Delivery App");

        Context context = new Context();
        context.setVariable("customerName", customerName);
        context.setVariable("resetToken", resetToken);
        context.setVariable("frontendUrl", frontendUrl);
        context.setVariable("resetLink", frontendUrl + "/reset-password?token=" + resetToken);

        String htmlContent = templateEngine.process("password-reset-email", context);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    public void sendPasswordResetConfirmationEmail(String toEmail, String customerName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Password Successfully Reset - Food Delivery App");

        Context context = new Context();
        context.setVariable("customerName", customerName);
        context.setVariable("frontendUrl", frontendUrl);

        String htmlContent = templateEngine.process("password-reset-confirmation", context);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}
