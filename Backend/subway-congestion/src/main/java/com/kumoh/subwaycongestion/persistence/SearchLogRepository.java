package com.kumoh.subwaycongestion.persistence;

import com.kumoh.subwaycongestion.dto.SearchLogDTO;
import com.kumoh.subwaycongestion.model.BookmarkEntity;
import com.kumoh.subwaycongestion.model.SearchLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchLogRepository extends JpaRepository<SearchLogEntity, String> {
    @Query("SELECT se.station, COUNT(se.station) FROM SearchLogEntity se GROUP BY se.station ORDER BY COUNT(se.station) DESC ")
    List<?> getStationCounts();
}
