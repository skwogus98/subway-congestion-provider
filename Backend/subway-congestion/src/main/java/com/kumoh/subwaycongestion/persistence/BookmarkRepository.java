package com.kumoh.subwaycongestion.persistence;

import com.kumoh.subwaycongestion.model.BookmarkEntity;
import com.kumoh.subwaycongestion.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<BookmarkEntity, String> {
    List<BookmarkEntity> findAllByEmail(String email);
}
