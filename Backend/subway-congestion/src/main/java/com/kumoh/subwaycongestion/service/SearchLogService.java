package com.kumoh.subwaycongestion.service;

import com.kumoh.subwaycongestion.dto.SearchLogDTO;
import com.kumoh.subwaycongestion.model.SearchLogEntity;
import com.kumoh.subwaycongestion.model.UserLogEntity;
import com.kumoh.subwaycongestion.persistence.SearchLogRepository;
import com.kumoh.subwaycongestion.persistence.UserLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class SearchLogService {
    @Autowired
    SearchLogRepository searchLogRepository;

    public void create(final SearchLogEntity searchLogEntity) {
        if (searchLogEntity == null || searchLogEntity.getStation() == null) {
            throw new RuntimeException("Invalid argument");
        }

        searchLogRepository.save(searchLogEntity);
    }

    public List<?> retrieve() {
        return searchLogRepository.getStationCounts();
    }
}
