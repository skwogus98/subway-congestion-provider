package com.kumoh.subwaycongestion.controller;

import com.kumoh.subwaycongestion.dto.ResponseDTO;
import com.kumoh.subwaycongestion.dto.UserLogDTO;
import com.kumoh.subwaycongestion.model.UserLogEntity;
import com.kumoh.subwaycongestion.service.UserLogService;
import com.kumoh.subwaycongestion.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/log")
public class UserLogController {
    @Autowired
    private UserLogService userLogService;

    @Autowired
    private UserService userService;

    @GetMapping
    private ResponseEntity<?> getLog(@AuthenticationPrincipal String userId){
        String temporaryUserId = userId;
        List<UserLogEntity> entities = userLogService.retrieve();
        List<UserLogDTO> dtos = entities.stream().map(UserLogDTO::new).collect(Collectors.toList());
        ResponseDTO<UserLogDTO> responseDTO = ResponseDTO.<UserLogDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(responseDTO);
    }
}
