package com.kumoh.subwaycongestion.service;

import com.kumoh.subwaycongestion.model.BookmarkEntity;
import com.kumoh.subwaycongestion.model.UserEntity;
import com.kumoh.subwaycongestion.persistence.BookmarkRepository;
import com.kumoh.subwaycongestion.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BookmarkService {
    @Autowired
    BookmarkRepository bookmarkRepository;

    public BookmarkEntity create(final BookmarkEntity bookmarkEntity) {
        if (bookmarkEntity == null || bookmarkEntity.getEmail() == null) {
            throw new RuntimeException("Invalid argument");
        }
        return bookmarkRepository.save(bookmarkEntity);
    }

    public List<BookmarkEntity> getBookmark(final String email) {
        return bookmarkRepository.findAllByEmail(email);
    }

    public void delete(final String id) {
        bookmarkRepository.deleteById(id);
    }
}
