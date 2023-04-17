package com.kumoh.subwaycongestion.dto;

import com.kumoh.subwaycongestion.model.UserLogEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLogDTO {
    private String email;
    private Date loginTime;

    public UserLogDTO(UserLogEntity userLogEntity) {
        this.email = userLogEntity.getEmail();
        this.loginTime = userLogEntity.getLoginTime();
    }
}
