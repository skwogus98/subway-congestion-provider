package com.kumoh.subwaycongestion.persistence;

import com.kumoh.subwaycongestion.model.UserEntity;
import com.kumoh.subwaycongestion.model.UserLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLogRepository extends JpaRepository<UserLogEntity, String> {

}
