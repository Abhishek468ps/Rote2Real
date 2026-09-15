package com.braintrain.mvp.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;


@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileUploadController {

    @PostMapping("/resume")
    public ResponseEntity<String> uploadResume(
            @RequestParam("file") MultipartFile file
    ) throws IOException {
          // ===========================
    // File Validation
    // ===========================

    if (file.isEmpty()) {
        return ResponseEntity.badRequest().body("File is required");
    }

    if (!"application/pdf".equals(file.getContentType())) {
        return ResponseEntity.badRequest().body("Only PDF files are allowed");
    }

    if (file.getSize() > 5 * 1024 * 1024) {
        return ResponseEntity.badRequest().body("File size must be less than 5 MB");
    }

        String uploadDir = "uploads/resumes/";

        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path path =
                Paths.get(uploadDir + fileName);

        Files.copy(
                file.getInputStream(),
                path,
                StandardCopyOption.REPLACE_EXISTING
        );

        return ResponseEntity.ok(
                "/uploads/resumes/" + fileName
        );
    }
}
