package org.example.demoweblab4.controllers;

import org.example.demoweblab4.domain.Coordinate;
import org.example.demoweblab4.domain.Point;
import org.example.demoweblab4.services.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/points/")
public class PointController {
    @Autowired
    private PointService pointService;

    @GetMapping("all_points")
    public List<Point> getAllPoints() {
        return pointService.getAllPoints();
    }

    @PostMapping("save_point")
    public Point savePoint(@RequestBody Coordinate coordinate) {
        try {
            return pointService.savePoint(coordinate);
        }
        catch (IllegalArgumentException e) {
            return null;
        }
    }

    @DeleteMapping("delete_points")
    public void deletePoints() {
        try{
            pointService.deletePoints();
        }
        catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
    }
}
