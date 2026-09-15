
package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.braintrain.mvp.entity.User;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Value;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${BREVO_API_KEY}")
    private String brevoApiKey;

    @Value("${MAIL_FROM_EMAIL:noreply@braintrainllp.in}")
    private String mailFromEmail;

    @Value("${MAIL_FROM_NAME:BrainTrain}")
    private String mailFromName;

    @Override
    public void sendOtpEmail(
            String email,
            String otp
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

         MimeMessageHelper helper =
        new MimeMessageHelper(
                message,
                true,
                "UTF-8"
        );

helper.setFrom("noreply@braintrainllp.in");
helper.setTo(email);

helper.setSubject(
        "BrainTrain Email Verification OTP"
);

            String htmlContent =
                    """
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>

                    <body style="
                            margin:0;
                            padding:0;
                            background:#f4f6f9;
                            font-family:Arial,sans-serif;
                    ">

                    <table width="100%%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center">

                                <table width="600" cellpadding="0" cellspacing="0"
                                       style="
                                            background:#ffffff;
                                            margin-top:30px;
                                            border-radius:12px;
                                            overflow:hidden;
                                            box-shadow:0 4px 12px rgba(0,0,0,0.08);
                                       ">

                                    <tr>
                                        <td align="center"
                                            style="
                                                background:#0f172a;
                                                padding:30px;
                                                color:white;
                                            ">
                                            <h1 style="margin:0;">
                                                BrainTrain
                                            </h1>

                                            <p style="margin-top:10px;">
                                                Secure Email Verification
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:40px;">

                                            <h2>
                                                Hello,
                                            </h2>

                                            <p>
                                                Thank you for choosing BrainTrain.
                                            </p>

                                            <p>
                                                Use the following One-Time Password (OTP)
                                                to verify your email address:
                                            </p>

                                            <div style="
                                                    text-align:center;
                                                    margin:30px 0;
                                            ">
                                                <span style="
                                                        display:inline-block;
                                                        padding:18px 35px;
                                                        font-size:32px;
                                                        font-weight:bold;
                                                        letter-spacing:8px;
                                                        color:#ffffff;
                                                        background:#2563eb;
                                                        border-radius:10px;
                                                ">
                                                    %s
                                                </span>
                                            </div>

                                            <p>
                                                This OTP is valid for
                                                <strong>10 minutes</strong>.
                                            </p>

                                            <p>
                                                For security reasons,
                                                do not share this OTP with anyone.
                                            </p>

                                            <p>
                                                If you did not request this code,
                                                you can safely ignore this email.
                                            </p>

                                            <br>

                                            <p>
                                                Regards,<br>
                                                <strong>BrainTrain Team</strong>
                                            </p>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center"
                                            style="
                                                background:#f8fafc;
                                                padding:20px;
                                                color:#64748b;
                                                font-size:12px;
                                            ">
                                            © 2026 BrainTrain LLP.
                                            All Rights Reserved.
                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>

                    </body>
                    </html>
                    """.formatted(otp);

            helper.setText(
                    htmlContent,
                    true
            );

            sendViaBrevo(
                    email,
                    "BrainTrain Email Verification OTP",
                    htmlContent
            );

            System.out.println(
                    "OTP email sent successfully to: "
                            + email
            );

        } catch (MessagingException e) {
            throw new RuntimeException(
                    "Failed to send OTP email",
                    e
            );
        }
    }

    @Override
public void sendWelcomeEmail(
        User user
) {

    try {

        MimeMessage message =
                mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        true,
                        "UTF-8"
                );
helper.setFrom("noreply@braintrainllp.in");
        helper.setTo(user.getEmail());

         helper.setSubject(
                "🎉 Welcome to Brain Train Consultancy Services LLP"
        );

  

        String registrationDate =
                LocalDateTime.now()
                        .format(
                                DateTimeFormatter.ofPattern(
                                        "dd MMM yyyy hh:mm a"
                                )
                        );

        String loginUrl =
                "https://braintrainllp.in/login";

        String profileUrl =
                "https://braintrainllp.in/profile/complete";

        String welcomeKitUrl =
                "https://braintrainllp.in/welcome-kit";

        String website =
                "https://braintrainllp.in";

        String linkedin =
                "https://linkedin.com/company/braintrain";

        String youtube =
                "https://youtube.com/@braintrain";

        String instagram =
                "https://instagram.com/braintrain";

        String whatsapp =
                "https://wa.me/919999999999";

        String htmlContent =
        """        
        <!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width,initial-scale=1.0">

<title>
Brain Train Welcome
</title>

<style>

@media only screen and (max-width:600px){

.container{
width:100%% !important;
}

.mobile-padding{
padding:20px !important;
}

.mobile-heading{
font-size:26px !important;
line-height:34px !important;
}

.mobile-text{
font-size:15px !important;
line-height:24px !important;
}

.mobile-button{
display:block !important;
width:100%% !important;
box-sizing:border-box;
}

}

</style>

</head>

<body style="
background:#eef2f7;
margin:0;
padding:0;
width:100%%;
font-family:Arial,Helvetica,sans-serif;
-webkit-text-size-adjust:100%%;
-ms-text-size-adjust:100%%;
">

<table
role="presentation"
width="100%%"
cellpadding="0"
cellspacing="0"
border="0"
style="
width:100%%;
background:#eef2f7;
padding:20px 10px;
margin:0;
">

<tr>

<td align="center">

<table
role="presentation"
class="container"
width="100%%"
cellpadding="0"
cellspacing="0"
border="0"
style="
max-width:700px;
width:100%%;
margin:0 auto;
background:#ffffff;
border-radius:18px;
overflow:hidden;
">

<!-- ========================= -->
<!-- HEADER -->
<!-- ========================= -->

<tr>

<td
align="center"
style="
background:linear-gradient(135deg,#0f172a,#2563eb);
padding:40px 25px;
color:white;
">

<div
style="
height:80px;
width:80px;
background:white;
border-radius:50%%;
display:inline-flex;
align-items:center;
justify-content:center;
font-size:34px;
">

🧠

</div>

<h1
style="
margin-top:20px;
font-size:34px;
margin-bottom:8px;
">

Brain Train

</h1>

<p
style="
margin:0;
font-size:16px;
opacity:.95;
">

AI Powered Learning Ecosystem

</p>

</td>

</tr>

<!-- HERO -->

<tr>

<td
class="mobile-padding"
style="
padding:35px 25px;
text-align:center;

">

<div
style="
font-size:70px;
">

🎉

</div>

<h2
style="
margin-top:15px;
font-size:30px;
line-height:40px;
word-break:break-word;
color:#0f172a;
">

Welcome

<br>

%s

</h2>

<p
style="
font-size:16px;
color:#475569;
line-height:28px;
margin-top:20px;
">

Congratulations!

<br><br>

Your Brain Train account has been
created successfully.

We are excited to have you join our
AI Powered Learning Ecosystem.

</p>

</td>

</tr>

<!-- USER DETAILS -->

<tr>

<td class="mobile-padding"
style="padding:0 20px 35px;">

<table
width="100%%"
cellpadding="15"
cellspacing="0"
style="
border:1px solid #e2e8f0;
border-radius:16px;
background:#f8fafc;
">

<tr>

<td
align="center">

<div
style="
font-size:60px;
">

👤

</div>

<h2
style="
margin:12px 0;
color:#0f172a;
">

%s

</h2>

<p
style="
color:#64748b;
font-size:15px;
">

Registered Brain Train Member

</p>

</td>

</tr>

</table>

</td>

</tr>

<!-- Brain Train ID CARD -->

<tr>

<td
style="
padding:0 45px 35px;
">

<div
style="
background:#0f172a;
border-radius:18px;
padding:25px;
text-align:center;
color:white;
">

<p
style="
margin:0;
font-size:15px;
letter-spacing:2px;
">

BRAIN TRAIN ID

</p>

<h1
style="
margin-top:15px;
font-size:34px;
color:#38bdf8;
">

%s

</h1>

<p
style="
opacity:.8;
">

Keep this ID safe.

It will be required every time
you login.

</p>

</div>

</td>

</tr>

<!-- DETAILS -->

<tr>

<td
style="
padding:0 45px 45px;
">

<table
width="100%%"
cellpadding="18"
cellspacing="0"
style="
border:1px solid #e2e8f0;
border-radius:16px;
">

<tr>

<td>

<strong>

Role

</strong>

</td>

<td align="right">

%s

</td>

</tr>

<tr>

<td>

<strong>

Registration Date

</strong>

</td>

<td align="right">

%s

</td>

</tr>

<tr>

<td>

<strong>

Account Status

</strong>

</td>

<td align="right">

<span
style="
background:#dcfce7;
padding:8px 18px;
border-radius:30px;
color:#15803d;
font-weight:bold;
">

✔ ACTIVE

</span>

</td>

</tr>

</table>

</td>

</tr>
                    <!-- Action Buttons -->

                    <table
                        width="100%%"
                        cellpadding="0"
                        cellspacing="0"
                        style="margin-top:35px;"
                    >
                        <tr>

                            <td align="center">

                                <a
                                    href="https://braintrainllp.in/login"
                                    style="
                                        background:#2563eb;
                                        color:#ffffff;
                                        text-decoration:none;
                                        border-radius:10px;
                                        font-size:16px;
                                        font-weight:bold;
                                        display:inline-block;
padding:14px 28px;
min-width:220px;
text-align:center;
box-sizing:border-box;
                                    "
                                >
                                    Login to Brain Train
                                </a>

                            </td>

                        </tr>

                        <tr>
                            <td height="18"></td>
                        </tr>

                        <tr>

                            <td align="center">

                                <a
                                    href="https://braintrainllp.in/profile/complete"
                                    style="
                                        background:#10b981;
                                        color:#ffffff;
                                        text-decoration:none;
                                       
                                        border-radius:10px;
                                        font-size:15px;
                                        font-weight:bold;
                                        display:inline-block;
padding:14px 28px;
min-width:220px;
text-align:center;
box-sizing:border-box;
                                    "
                                >
                                    Complete Your Profile
                                </a>

                            </td>

                        </tr>

                        <tr>
                            <td height="18"></td>
                        </tr>

                        <tr>

                            <td align="center">

                                <a
                                    href="https://braintrainllp.in/downloads/welcome-kit.pdf"
                                    style="
                                        background:#7c3aed;
                                        color:#ffffff;
                                        text-decoration:none;
                                        
                                        border-radius:10px;
                                        font-size:15px;
                                        font-weight:bold;
                                        display:inline-block;
padding:14px 28px;
min-width:220px;
text-align:center;
box-sizing:border-box;
                                    "
                                >
                                    Download Welcome Kit
                                </a>

                            </td>

                        </tr>

                    </table>


                    <!-- Security -->

                    <table
                        width="100%%"
                        cellpadding="20"
                        cellspacing="0"
                        style="
                            margin-top:40px;
                            background:#f8fafc;
                            border-radius:12px;
                        "
                    >

                        <tr>

                            <td>

                                <h3
                                    style="
                                        margin-top:0;
                                        color:#111827;
                                    "
                                >
                                    🔐 Security Reminder
                                </h3>

                                <p
                                    style="
                                        color:#475569;
                                        line-height:28px;
                                        font-size:15px;
                                    "
                                >
                                    Your Brain Train ID is your unique identity
                                    across the Brain Train ecosystem.

                                    Please keep it secure and never share your
                                    account credentials with anyone.
                                </p>

                            </td>

                        </tr>

                    </table>


                    <!-- Support -->

                    <table
                        width="100%%"
                        cellpadding="20"
                        cellspacing="0"
                        style="
                            margin-top:30px;
                            background:#ffffff;
                            border:1px solid #e5e7eb;
                            border-radius:12px;
                        "
                    >

                        <tr>

                            <td align="center">

                                <h3
                                    style="
                                        margin:0;
                                        color:#111827;
                                    "
                                >
                                    Need Help?
                                </h3>

                                <p
                                    style="
                                        color:#475569;
                                        line-height:30px;
                                        margin-top:20px;
                                    "
                                >

                                    📧 support@braintrainllp.in

                                    <br><br>

                                    🌐 https://braintrainllp.in

                                </p>

                            </td>

                        </tr>

                    </table>


                    <!-- Social Links -->

                    <table
                        width="100%%"
                        cellpadding="15"
                        cellspacing="0"
                        style="
                            margin-top:30px;
                        "
                    >

                        <tr>

                            <td align="center">

                                <a
                                    href="https://www.linkedin.com/company/braintrainllp"
                                    style="
                                        text-decoration:none;
                                        margin-right:18px;
                                        color:#2563eb;
                                        font-weight:bold;
                                    "
                                >
                                    LinkedIn
                                </a>

                                <a
                                    href="https://youtube.com"
                                    style="
                                        text-decoration:none;
                                        margin-right:18px;
                                        color:#dc2626;
                                        font-weight:bold;
                                    "
                                >
                                    YouTube
                                </a>

                                <a
                                    href="https://instagram.com"
                                    style="
                                        text-decoration:none;
                                        margin-right:18px;
                                        color:#e11d48;
                                        font-weight:bold;
                                    "
                                >
                                    Instagram
                                </a>

                                <a
                                    href="https://wa.me/919999999999"
                                    style="
                                        text-decoration:none;
                                        color:#16a34a;
                                        font-weight:bold;
                                    "
                                >
                                    WhatsApp
                                </a>

                            </td>

                        </tr>

                    </table>


                    <!-- Footer -->

                    <table
                        width="100%%"
                        cellpadding="25"
                        cellspacing="0"
                        style="
                            margin-top:40px;
                            background:#0f172a;
                        "
                    >

                        <tr>

                            <td
                                align="center"
                                style="
                                    color:#cbd5e1;
                                    font-size:13px;
                                    line-height:28px;
                                "
                            >

                                <strong
                                    style="
                                        color:#ffffff;
                                        font-size:18px;
                                    "
                                >
                                    Brain Train Consultancy Services LLP
                                </strong>

                                <br><br>

                                AI Powered Learning Ecosystem

                                <br>

                                Empowering Students,
                                Professionals &
                                Organizations through AI,
                                Innovation and Digital Transformation.

                                <br><br>

                                © 2026 Brain Train Consultancy Services LLP

                                <br>

                                All Rights Reserved.

                            </td>

                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
</html>
"""
.formatted(
    user.getFullName(),        // Welcome
    user.getFullName(),        // User Details
    user.getBraintrainId(),    // Brain Train ID
    user.getRole().name(),         // Role
    registrationDate           // Registration Date
);

      helper.setText(htmlContent, true);
sendViaBrevo(
        user.getEmail(),
        "🎉 Welcome to Brain Train Consultancy Services LLP",
        htmlContent
);

 }
                   catch (Exception e) {
    throw new RuntimeException("Failed to send welcome email", e);
}
}

    private void sendViaBrevo(
            String recipient,
            String subject,
            String htmlContent
    ) {

        try {
            String json = """
                    {
                      "sender": {
                        "name": "%s",
                        "email": "%s"
                      },
                      "to": [
                        {
                          "email": "%s"
                        }
                      ],
                      "subject": "%s",
                      "htmlContent": "%s"
                    }
                    """.formatted(
                    jsonEscape(mailFromName),
                    jsonEscape(mailFromEmail),
                    jsonEscape(recipient),
                    jsonEscape(subject),
                    jsonEscape(htmlContent)
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
                    .header("accept", "application/json")
                    .header("api-key", brevoApiKey)
                    .header("content-type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response =
                    HttpClient.newHttpClient().send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new RuntimeException(
                        "Brevo email API failed. HTTP "
                                + response.statusCode()
                                + ": "
                                + response.body()
                );
            }

            System.out.println(
                    "Email sent successfully via Brevo to: "
                            + recipient
            );

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to send email via Brevo",
                    e
            );
        }
    }

    private String jsonEscape(String value) {
        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "\\r")
                .replace("\n", "\\n");
    }

}