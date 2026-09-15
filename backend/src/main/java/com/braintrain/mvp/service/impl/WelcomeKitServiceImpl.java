package com.braintrain.mvp.service.impl;

import com.braintrain.mvp.entity.User;
import com.braintrain.mvp.repository.UserRepository;
import com.braintrain.mvp.service.WelcomeKitService;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Div;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class WelcomeKitServiceImpl
        implements WelcomeKitService {

            private static final DeviceRgb PRIMARY =
        new DeviceRgb(15, 23, 42);

private static final DeviceRgb SECONDARY =
        new DeviceRgb(37, 99, 235);

private static final DeviceRgb LIGHT =
        new DeviceRgb(248, 250, 252);

private static final DeviceRgb SUCCESS =
        new DeviceRgb(22, 163, 74);

private static final DeviceRgb SKY =
        new DeviceRgb(56, 189, 248);

        private final UserRepository userRepository;

    @Override
public byte[] generateWelcomeKit(String brainTrainId) {

    User user =
            userRepository
                    .findByBraintrainId(brainTrainId)
                    .orElseThrow(() ->
                            new RuntimeException("User not found"));

    try {

        ByteArrayOutputStream output =
                new ByteArrayOutputStream();

        PdfWriter writer =
                new PdfWriter(output);

        PdfDocument pdf =
                new PdfDocument(writer);

        Document document =
                new Document(pdf, PageSize.A4);

        document.setMargins(
                0,
                0,
                30,
                0
        );

        addHeader(document);
         addWelcomeSection(
        document,
        user
);
        document.close();

        return output.toByteArray();

    } catch (Exception e) {

        throw new RuntimeException(e);

    }
}

private void addHeader(Document document)
        throws IOException {

    Table header =
            new Table(UnitValue.createPercentArray(1));

    header.setWidth(UnitValue.createPercentValue(100));

    Cell cell =
            new Cell();

    cell.setBackgroundColor(PRIMARY);

    cell.setBorder(Border.NO_BORDER);

    cell.setPaddingTop(35);

    cell.setPaddingBottom(35);

    cell.setPaddingLeft(35);

    cell.setPaddingRight(35);

    try {

        ClassPathResource resource =
                new ClassPathResource("static/images/logo.jpeg");

        Image logo =
                new Image(
                        ImageDataFactory.create(
                                resource.getInputStream().readAllBytes()
                        )
                );

        logo.scaleToFit(70, 70);

        logo.setHorizontalAlignment(
                HorizontalAlignment.CENTER
        );

        cell.add(logo);

    } catch (Exception ignored) {

        cell.add(
                new Paragraph("🧠")
                        .setFontSize(36)
                        .setFontColor(ColorConstants.WHITE)
                        .setTextAlignment(TextAlignment.CENTER)
        );

    }

    cell.add(

            new Paragraph("Brain Train")
                    .setBold()
                    .setFontSize(26)
                    .setFontColor(ColorConstants.WHITE)
                    .setTextAlignment(TextAlignment.CENTER)

    );

    cell.add(

            new Paragraph(
                    "AI Powered Learning Ecosystem"
            )
                    .setFontSize(14)
                    .setFontColor(ColorConstants.WHITE)
                    .setTextAlignment(TextAlignment.CENTER)

    );

    header.addCell(cell);

    document.add(header);
}



private void addWelcomeSection(
        Document document,
        User user
) throws IOException {
    PdfFont titleFont =
        PdfFontFactory.createFont(
                StandardFonts.HELVETICA_BOLD
        );

PdfFont normalFont =
        PdfFontFactory.createFont(
                StandardFonts.HELVETICA
        );
Paragraph welcomeTitle = new Paragraph("WELCOME TO BRAIN TRAIN")
        .setFont(titleFont)
        .setFontSize(24)
        .setBold()
        .setFontColor(ColorConstants.BLUE)
        .setTextAlignment(TextAlignment.CENTER);

document.add(welcomeTitle);

Paragraph welcomeText = new Paragraph(
        "Congratulations! Your Brain Train account has been created successfully.\n\n" +
        "We are excited to welcome you to our AI Powered Learning Ecosystem."
)
        .setFont(normalFont)
        .setFontSize(12)
        .setTextAlignment(TextAlignment.CENTER);

document.add(welcomeText);

document.add(new Paragraph("\n"));

Table userTable = new Table(UnitValue.createPercentArray(new float[]{35, 65}))
        .useAllAvailableWidth();

userTable.setBorder(new SolidBorder(ColorConstants.LIGHT_GRAY, 1));

userTable.addCell(
        new Cell()
                .add(new Paragraph("Full Name").setBold())
);

userTable.addCell(
        new Cell()
                .add(new Paragraph(user.getFullName()))
);

userTable.addCell(
        new Cell()
                .add(new Paragraph("Email").setBold())
);

userTable.addCell(
        new Cell()
                .add(new Paragraph(user.getEmail()))
);

userTable.addCell(
        new Cell()
                .add(new Paragraph("Role").setBold())
);

userTable.addCell(
        new Cell()
                .add(new Paragraph(user.getRole().name()))
);

document.add(userTable);

document.add(new Paragraph("\n"));

Div idCard = new Div();

idCard.setBackgroundColor(new DeviceRgb(15, 23, 42));

idCard.setPadding(20);



Paragraph idTitle = new Paragraph("BRAIN TRAIN ID")
        .setFont(normalFont)
        .setFontColor(ColorConstants.WHITE)
        .setTextAlignment(TextAlignment.CENTER);

Paragraph idValue = new Paragraph(user.getBraintrainId())
        .setFont(titleFont)
        .setFontSize(22)
        .setBold()
        .setFontColor(new DeviceRgb(56, 189, 248))
        .setTextAlignment(TextAlignment.CENTER);

Paragraph idDesc = new Paragraph(
        "Keep this ID safe.\nIt will be required every time you login."
)
        .setFont(normalFont)
        .setFontColor(ColorConstants.WHITE)
        .setTextAlignment(TextAlignment.CENTER);

idCard.add(idTitle);
idCard.add(idValue);
idCard.add(idDesc);

document.add(idCard);

document.add(new Paragraph("\n"));

Table infoTable = new Table(UnitValue.createPercentArray(new float[]{40, 60}))
        .useAllAvailableWidth();

infoTable.setBorder(new SolidBorder(ColorConstants.GRAY, 1));

infoTable.addCell(new Cell().add(new Paragraph("Registration Date").setBold()));

infoTable.addCell(
        new Cell().add(
                new Paragraph(
                        LocalDateTime.now()
                                .format(
                                        DateTimeFormatter.ofPattern(
                                                "dd MMM yyyy hh:mm a"
                                        )
                                )
                )
        )
);

infoTable.addCell(
        new Cell().add(
                new Paragraph("Account Status").setBold()
        )
);

infoTable.addCell(
        new Cell().add(
                new Paragraph("ACTIVE")
                        .setFontColor(ColorConstants.GREEN)
                        .setBold()
        )
);

infoTable.addCell(
        new Cell().add(
                new Paragraph("Website").setBold()
        )
);

infoTable.addCell(
        new Cell().add(
                new Paragraph("https://braintrainllp.in")
        )
);

document.add(infoTable);
document.add(new Paragraph("\n"));
}


}
