
package jsp.springbootfinal.service;

import java.util.List;
import java.util.Map;

import jakarta.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jsp.springbootfinal.enums.Status;

@Service
public class EmailService {

    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://api.resend.com")
            .build();

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    private String cleanFrontendUrl() {
        return frontendUrl.replaceAll("/+$", "");
    }

    private void sendHtmlEmail(
            String toEmail,
            String subject,
            String htmlContent) throws MessagingException {

        Map<String, Object> requestBody = Map.of(
                "from", fromEmail,
                "to", List.of(toEmail),
                "subject", subject,
                "html", htmlContent
        );

        try {
            restClient.post()
                    .uri("/emails")
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();

        } catch (RestClientException ex) {
            throw new MessagingException(
                    "Failed to send email through Resend: "
                            + ex.getMessage(), ex);
        }
    }

    public void sendPasswordResetEmail(
            String toEmail,
            String resetToken,
            String customerName) throws MessagingException {

        String baseUrl = cleanFrontendUrl();
        String resetLink = baseUrl
                + "/reset-password?token=" + resetToken;

        Context context = new Context();
        context.setVariable("customerName", customerName);
        context.setVariable("resetToken", resetToken);
        context.setVariable("frontendUrl", baseUrl);
        context.setVariable("resetLink", resetLink);

        String htmlContent = templateEngine.process(
                "password-reset-email", context);

        sendHtmlEmail(
                toEmail,
                "Password Reset Request - Food Delivery App",
                htmlContent
        );
    }

    public void sendPasswordResetConfirmationEmail(
            String toEmail,
            String customerName) throws MessagingException {

        String baseUrl = cleanFrontendUrl();

        Context context = new Context();
        context.setVariable("customerName", customerName);
        context.setVariable("frontendUrl", baseUrl);

        String htmlContent = templateEngine.process(
                "password-reset-confirmation", context);

        sendHtmlEmail(
                toEmail,
                "Password Successfully Reset - Food Delivery App",
                htmlContent
        );
    }

    public void sendOrderStatusEmail(
            String toEmail,
            String customerName,
            Integer orderId,
            Status status) throws MessagingException {

        Context context = new Context();
        context.setVariable("customerName", customerName);
        context.setVariable("orderId", orderId);
        context.setVariable("status", status.name());
        context.setVariable("frontendUrl", cleanFrontendUrl());

        String htmlContent = templateEngine.process(
                "order-status-email", context);

        sendHtmlEmail(
                toEmail,
                "Order #" + orderId + " - " + status.name(),
                htmlContent
        );
    }
}
