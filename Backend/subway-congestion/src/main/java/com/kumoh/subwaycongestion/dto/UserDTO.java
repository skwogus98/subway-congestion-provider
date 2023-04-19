package com.kumoh.subwaycongestion.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String token;
    private String email;
    private String username;
    private String password;
    private String grade;
    private String newPassword;
    private String id;
}
