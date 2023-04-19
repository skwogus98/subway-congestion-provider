package com.kumoh.subwaycongestion.controller;

import com.kumoh.subwaycongestion.dto.ResponseDTO;
import com.kumoh.subwaycongestion.dto.SearchLogDTO;
import com.kumoh.subwaycongestion.dto.UserLogDTO;
import com.kumoh.subwaycongestion.model.SearchLogEntity;
import com.kumoh.subwaycongestion.model.UserLogEntity;
import com.kumoh.subwaycongestion.service.SearchLogService;
import com.kumoh.subwaycongestion.service.UserLogService;
import com.kumoh.subwaycongestion.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/searchLog")
public class SearchLogController {
    @Autowired
    private SearchLogService searchLogService;

    @GetMapping
    private ResponseEntity<?> getLog(@AuthenticationPrincipal String userId){
        if (userId == null) {
            // 로그인하지 않은 사용자에게 접근 불가 처리
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<?> dtos = searchLogService.retrieve();
        ResponseDTO<SearchLogDTO> responseDTO = ResponseDTO.<SearchLogDTO>builder().data((List<SearchLogDTO>) dtos).build();
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping
    private ResponseEntity<?> addLog(@AuthenticationPrincipal String userId, @RequestBody SearchLogDTO searchLogDTO){
        if (userId == null) {
            // 로그인하지 않은 사용자에게 접근 불가 처리
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        searchLogService.create(SearchLogEntity.builder().station(searchLogDTO.getStation()).build());
        ResponseDTO responseDTO = ResponseDTO.builder().data(null).build();
        return ResponseEntity.ok().body(responseDTO);
    }
}
