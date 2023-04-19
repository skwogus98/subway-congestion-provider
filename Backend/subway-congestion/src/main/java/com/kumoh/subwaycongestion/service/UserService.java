package com.kumoh.subwaycongestion.service;

import com.kumoh.subwaycongestion.model.UserEntity;
import com.kumoh.subwaycongestion.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserEntity create(final UserEntity userEntity) {
        if (userEntity == null || userEntity.getEmail() == null) {
            throw new RuntimeException("Invalid argument");
        }
        final String email = userEntity.getEmail();
        if (userRepository.existsByEmail(email)) {
            log.warn("Email already exists {}", email);
            throw new RuntimeException("Email exists");
        }
        return userRepository.save(userEntity);
    }

    public UserEntity getByCredentials(final String email, final String password, final PasswordEncoder encoder) {
        final UserEntity originalUser = userRepository.findByEmail(email);
        if (originalUser != null && encoder.matches(password, originalUser.getPassword())) {
            return originalUser;
        }
        return null;
    }
    @Transactional
    public UserEntity update(final UserEntity userEntity, final UserEntity newUserEntity) {
        if (userEntity == null || userEntity.getEmail() == null) {
            throw new RuntimeException("Invalid argument");
        }
        userEntity.setUsername(newUserEntity.getUsername());
        userEntity.setPassword(newUserEntity.getPassword());
        return userEntity;
    }

    public Optional<UserEntity> getGrade(final String id) {
        return userRepository.findById(id);
    }

    @Transactional
    public void delete(final String email) {
        userRepository.deleteByEmail(email);
    }
}
