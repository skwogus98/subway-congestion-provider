package com.kumoh.subwaycongestion.service;

import com.kumoh.subwaycongestion.model.UserEntity;
import com.kumoh.subwaycongestion.model.UserLogEntity;
import com.kumoh.subwaycongestion.persistence.UserLogRepository;
import com.kumoh.subwaycongestion.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class UserLogService {
    @Autowired
    UserLogRepository userLogRepository;

    public void create(final UserLogEntity userLogEntity) {
        if (userLogEntity == null || userLogEntity.getEmail() == null) {
            throw new RuntimeException("Invalid argument");
        }

        userLogRepository.save(userLogEntity);
    }
}
