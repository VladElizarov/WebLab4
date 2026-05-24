package org.example.weblab4.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
public class Point {
    private Long id;
    private Coordinate coordinate;
    private boolean isHit;
    private LocalDateTime createDateTime;
    private long processDateTime;

    public Point() {}

    public Point(Coordinate coordinate, boolean isHit, LocalDateTime createDateTime) {
        this.coordinate = coordinate;
        this.isHit = isHit;
        this.createDateTime = createDateTime;
        this.processDateTime = java.time.Duration.between(createDateTime, LocalDateTime.now()).toMillis();
    }
    public void updateProcessTime() {
        this.processDateTime = java.time.Duration.between(createDateTime, LocalDateTime.now()).toMillis();
    }


    public Long getId() {
        return id;
    }

    public Coordinate getCoordinate() {
        return coordinate;
    }

    public LocalDateTime getCreateDateTime() {
        return createDateTime;
    }

    public long getProcessDateTime() {
        return processDateTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCoordinate(Coordinate coordinate) {
        this.coordinate = coordinate;
    }

    public void setCreateDateTime(LocalDateTime createDateTime) {
        this.createDateTime = createDateTime;
    }

    public void setHit(boolean hit) {
        isHit = hit;
    }

    public void setProcessDateTime(long processDateTime) {
        this.processDateTime = processDateTime;
    }

    public boolean isHit() {
        return isHit;
    }
}
