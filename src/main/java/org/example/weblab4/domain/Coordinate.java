package org.example.demoweblab4.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Coordinate {
    private double x;
    private double y;
    private double r;

    public Coordinate(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }


    public double getR() {
        return r;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
