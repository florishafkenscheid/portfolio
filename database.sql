-- Active: 1728375022408@@localhost@3306@floris_portfolio
CREATE USER 'floris'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON floris_portfolio.* TO 'floris'@'localhost';
FLUSH PRIVILEGES;

create database if not exists floris_portfolio;

use floris_portfolio;

create table posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    messageContent TEXT NOT NULL,
    author VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

create table comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    postId BIGINT NOT NULL,
    messageContent TEXT NOT NULL,
    author VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    Foreign Key (postId) REFERENCES posts(id)
);

create table projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    github_url VARCHAR(255)
);

insert into projects (
    title,
    image_path,
    github_url
) VALUES
(
    'Factorio',
    '/views/assets/fz-bot.png',
    'https://github.com/florishafkenscheid/fz-bot'
),
(
    'Lobby',
    '/views/assets/lobby.png',
    'https://github.com/florishafkenscheid/lobby'
),
(
    'WorldManager',
    '/views/assets/worldmanager.png',
    'https://github.com/florishafkenscheid/worldmanager'
),
(
    'PluginHider',
    '/views/assets/pluginhider.png',
    'https://github.com/florishafkenscheid/pluginhider'
);
