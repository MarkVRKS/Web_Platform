CREATE DATABASE IF NOT EXISTS web_platform;
USE web_platform;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nickname VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER USER 'root'@'localhost' IDENTIFIED BY 'root123';
FLUSH PRIVILEGES;
CREATE USER 'vrks_user'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON web_platform.* TO 'vrks_user'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE courses (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
	title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    rating INT NOT NULL check (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE lessons (
	id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    order_number INT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- CREATE TABLE progress (
-- 	user_id INT NOT mysqlNULL,
-- 	lesson_id INT NOT NULL,
--     is_completed BOOLEAN DEFAULT FALSE,
--     PRIMARY KEY (user_id, lesson_id),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (lesson_id) REFERENCES lessons(id)
-- );

