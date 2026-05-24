package org.example.demoweblab4.repositories;

import org.example.demoweblab4.domain.Coordinate;
import org.example.demoweblab4.domain.Point;
import org.example.demoweblab4.utils.DatabaseConnection;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class PointsRepository {

    public List<Point> findAll() {
        List<Point> points = new ArrayList<>();
        String sql = "SELECT * FROM records";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Point point = new Point();
                point.setId(resultSet.getLong("id"));
                point.setCoordinate(new Coordinate(
                        resultSet.getDouble("x"),
                        resultSet.getDouble("y"),
                        resultSet.getDouble("r")
                ));
                point.setHit(resultSet.getBoolean("in_area"));
                point.setCreateDateTime(resultSet.getTimestamp("start_time").toLocalDateTime());
                point.setProcessDateTime(resultSet.getLong("processed_time"));
                points.add(point);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return points;
    }

    public void deleteAll() {
        String sql = "DELETE FROM records";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Point save(Point point) {
        String sql = "INSERT INTO records (x, y, r, in_area, start_time, processed_time) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setDouble(1, point.getCoordinate().getX());
            preparedStatement.setDouble(2, point.getCoordinate().getY());
            preparedStatement.setDouble(3, point.getCoordinate().getR());
            preparedStatement.setBoolean(4, point.isHit());
            preparedStatement.setTimestamp(5, java.sql.Timestamp.valueOf(point.getCreateDateTime()));
            preparedStatement.setLong(6, point.getProcessDateTime());

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        point.setId(generatedKeys.getLong(1));
                        return point;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Optional<Point> findById(Long id) {
        String sql = "SELECT * FROM records WHERE id = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setLong(1, id);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    Point point = new Point();
                    point.setId(resultSet.getLong("id"));
                    point.setCoordinate(new Coordinate(
                            resultSet.getDouble("x"),
                            resultSet.getDouble("y"),
                            resultSet.getDouble("r")
                    ));
                    point.setHit(resultSet.getBoolean("in_area"));
                    point.setCreateDateTime(resultSet.getTimestamp("start_time").toLocalDateTime());
                    point.setProcessDateTime(resultSet.getLong("processed_time"));
                    return Optional.of(point);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }
}