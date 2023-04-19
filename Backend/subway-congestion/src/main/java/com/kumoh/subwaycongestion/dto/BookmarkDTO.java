package com.kumoh.subwaycongestion.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkDTO {
    private String id;
    private String email;
    private String stationFrom;
    private String stationTo;
}
