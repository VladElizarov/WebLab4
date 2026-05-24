# WebLab4

**Елизаров Владислав Павлович | ИСУ: 412938 | Вариант: 42345**

Веб-приложение для проверки попадания точек в область на графике. Лабораторная работа №4.

## Технологии

**Backend:**
- Java 17, Spring Boot 3.5.4
- Spring Security (аутентификация по сессии)
- PostgreSQL (JDBC)
- Lombok

**Frontend:**
- React 19
- Axios, React Router DOM
- Canvas (отрисовка графика)

## Запуск

### Требования
- JDK 17+
- Node.js 18+
- PostgreSQL 16

### База данных

Создайте базу данных и таблицы:

```sql
CREATE DATABASE studs2;

CREATE TABLE app_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER'
);

CREATE TABLE records (
    id BIGSERIAL PRIMARY KEY,
    x DOUBLE PRECISION NOT NULL,
    y DOUBLE PRECISION NOT NULL,
    r DOUBLE PRECISION NOT NULL,
    in_area BOOLEAN NOT NULL,
    start_time TIMESTAMP NOT NULL,
    processed_time BIGINT NOT NULL
);
```

Настройте подключение в `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/studs2
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Backend

```bash
./mvnw spring-boot:run
```

Сервер запустится на `http://localhost:8081`

### Frontend

```bash
cd front
npm install
npm start
```

Приложение откроется на `http://localhost:3000`

## Функциональность

- Регистрация и вход в систему
- Интерактивный график — клик по области ставит точку
- Ввод координат через форму
- Проверка попадания точки в заданную область
- История всех точек с результатами
- Очистка истории
