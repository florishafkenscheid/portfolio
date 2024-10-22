create database if not exists floris_portfolio;

use floris_portfolio;

create table posts if not exists (
    postId BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    messageContent TEXT NOT NULL,
    author VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

create table comments if not exists (
    commentId BIGINT AUTO_INCREMENT PRIMARY KEY,
    postId BIGINT NOT NULL,
    messageContent TEXT NOT NULL,
    author VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    Foreign Key (postId) REFERENCES (posts(postId))
);
