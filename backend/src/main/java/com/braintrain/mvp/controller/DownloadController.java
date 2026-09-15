package com.braintrain.mvp.controller;

import com.braintrain.mvp.service.WelcomeKitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/downloads")
@RequiredArgsConstructor
public class DownloadController {

    private final WelcomeKitService welcomeKitService;

    @GetMapping("/welcome-kit/{brainTrainId}")
    public ResponseEntity<byte[]> downloadWelcomeKit(
            @PathVariable String brainTrainId
    ) {

        byte[] pdf =
                welcomeKitService.generateWelcomeKit(brainTrainId);

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=BrainTrain-WelcomeKit.pdf"
                )

                .contentType(MediaType.APPLICATION_PDF)

                .body(pdf);
    }

}
