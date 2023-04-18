package com.kumoh.subwaycongestion.controller;

import com.kumoh.subwaycongestion.dto.ResponseDTO;
import com.kumoh.subwaycongestion.dto.UserDTO;
import com.kumoh.subwaycongestion.model.UserEntity;
import com.kumoh.subwaycongestion.model.UserLogEntity;
import com.kumoh.subwaycongestion.security.TokenProvider;
import com.kumoh.subwaycongestion.service.UserLogService;
import com.kumoh.subwaycongestion.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserLogService userLogService;

    @Autowired
    private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            UserEntity user = UserEntity.builder()
                    .email(userDTO.getEmail())
                    .username(userDTO.getUsername())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .grade("guest")
                    .build();
            UserEntity registeredUser = userService.create(user);
            UserDTO responseUserDTO = userDTO.builder()
                    .email(registeredUser.getEmail())
                    .id(registeredUser.getId())
                    .username(registeredUser.getUsername())
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        } catch (Exception e) {
            String err = e.getMessage();
            ResponseDTO responseDTO = ResponseDTO.builder().error(err).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> auth(@RequestBody UserDTO userDTO) {
        UserEntity user = userService.getByCredentials(userDTO.getEmail(), userDTO.getPassword(), passwordEncoder);
        UserLogEntity userLog = UserLogEntity.builder().email(userDTO.getEmail()).loginTime(new Date()).build();
        if (user != null) {
            final String token = tokenProvider.create(user);
            userLogService.create(userLog);
            final UserDTO responseUserDTO = UserDTO.builder()
                    .email(user.getEmail())
                    .id(user.getId())
                    .grade(user.getGrade())
                    .token(token)
                    .build();

            return ResponseEntity.ok().body(responseUserDTO);
        } else {
            ResponseDTO responseDTO = ResponseDTO.builder().error("login failed").build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

//    @PostMapping("/update")
//    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO) {
//        UserEntity user = userService.getByCredentials(userDTO.getEmail(), userDTO.getPassword(), passwordEncoder);
//
//        if (user != null) {
//            UserEntity newUser = UserEntity.builder()
//                    .email(userDTO.getEmail())
//                    .username(userDTO.getUsername())
//                    .password(passwordEncoder.encode(userDTO.getNewPassword()))
//                    .build();
//            UserEntity registeredUser = userService.update(user, newUser);
//            UserDTO responseUserDTO = userDTO.builder()
//                    .email(registeredUser.getEmail())
//                    .id(registeredUser.getId())
//                    .username(registeredUser.getUsername())
//                    .build();
//            return ResponseEntity.ok().body(responseUserDTO);
//        } else {
//            ResponseDTO responseDTO = ResponseDTO.builder().error("login failed").build();
//            return ResponseEntity.badRequest().body(responseDTO);
//        }
//    }
}

