-- Active: 1728375022408@@localhost@3306@floris_portfolio
create database if not exists floris_portfolio;

CREATE USER 'floris'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON floris_portfolio.* TO 'floris'@'localhost';
FLUSH PRIVILEGES;

use floris_portfolio;

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
    'BELT',
    '/views/assets/belt.png',
    'https://github.com/florishafkenscheid/belt'
),
(
    'Sharpfish',
    '/views/assets/sharpfish.png',
    'https://github.com/florishafkenscheid/Sharpfish'
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
