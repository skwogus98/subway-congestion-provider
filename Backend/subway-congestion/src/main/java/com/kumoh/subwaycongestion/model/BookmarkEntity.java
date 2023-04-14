package com.kumoh.subwaycongestion.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Bookmark")
public class BookmarkEntity {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private Integer id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String stationFrom;

    @Column(nullable = false)
    private String stationTo;
}
