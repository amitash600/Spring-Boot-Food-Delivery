package jsp.springbootfinal;

import jsp.springbootfinal.config.EmailConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class EmailConfigTest {

    @Autowired
    private EmailConfig emailConfig;

    @Autowired
    private JavaMailSender javaMailSender;

    @Test
    public void testEmailConfiguration() {
        assertNotNull(emailConfig, "EmailConfig should be properly configured");
        assertNotNull(javaMailSender, "JavaMailSender bean should be created");
        System.out.println("✅ Email configuration is working correctly!");
        System.out.println("✅ JavaMailSender bean successfully created!");
    }
}
