/*package com.braintrain.mvp.dto.request;

import com.braintrain.mvp.enums.UserRole;
import lombok.Data;

import java.util.Map;

import org.antlr.v4.runtime.misc.NotNull;

@Data
public class RegisterRequest {

    @NotBlank
private String fullName;

@NotBlank
@Email
private String email;

@NotBlank
private String phone;

@NotBlank
private String password;

@NotNull
private UserRole role;

   
    private Map<String, Object> profile;
}
*/

package com.braintrain.mvp.dto.request;

import com.braintrain.mvp.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

@Data
public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;

    /*
     * Role specific data
     */
    private Map<String, Object> profile;
}