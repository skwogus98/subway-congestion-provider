package com.kumoh.subwaycongestion.controller;

import com.kumoh.subwaycongestion.dto.BookmarkDTO;
import com.kumoh.subwaycongestion.dto.ResponseDTO;
import com.kumoh.subwaycongestion.dto.UserDTO;
import com.kumoh.subwaycongestion.model.BookmarkEntity;
import com.kumoh.subwaycongestion.model.UserEntity;
import com.kumoh.subwaycongestion.service.BookmarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/bookmark")
public class BookmarkController {
    @Autowired
    BookmarkService bookmarkService;

    @PostMapping
    public ResponseEntity<?> getBookmark(@RequestBody BookmarkDTO bookmarkDTO, @AuthenticationPrincipal String userId){
        if (userId == null) {
            ResponseDTO responseDTO = ResponseDTO.builder().error("You are not logged in").build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
        return ResponseEntity.ok().body(bookmarkService.getBookmark(bookmarkDTO.getEmail()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBookmark(@RequestBody BookmarkDTO bookmarkDTO, @AuthenticationPrincipal String userId) {
        if (userId == null) {
            ResponseDTO responseDTO = ResponseDTO.builder().error("You are not logged in").build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
        try {
            BookmarkEntity bookmarkEntity = BookmarkEntity.builder()
                    .email(bookmarkDTO.getEmail())
                    .stationFrom(bookmarkDTO.getStationFrom())
                    .stationTo(bookmarkDTO.getStationTo())
                    .build();
            bookmarkService.create(bookmarkEntity);
            ResponseDTO responseDTO = ResponseDTO.builder().data(null).build();
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e) {
            String err = e.getMessage();
            ResponseDTO responseDTO = ResponseDTO.builder().error(err).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteBookmark(@RequestBody BookmarkDTO bookmarkDTO, @AuthenticationPrincipal String userId){
        if (userId == null) {
            // 로그인하지 않은 사용자에게 접근 허용 및 추가 정보 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error("You are not logged in").build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
        bookmarkService.delete(bookmarkDTO.getId());
        ResponseDTO responseDTO = ResponseDTO.builder().data(null).build();
        return ResponseEntity.ok().body(responseDTO);
    }
}
