
package com.braintrain.mvp.dto.request;

import lombok.Data;

@Data
public class VerifyLoginOtpRequest {

    private String brainTrainId;

    private String email;

    private String otp;
}