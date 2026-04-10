package jsp.springbootfinal;

import jsp.springbootfinal.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    public void testEmailConfiguration() {
        // This test will fail if email configuration is not properly set up
        System.out.println("Email service bean successfully autowired: " + (emailService != null));
    }
}
