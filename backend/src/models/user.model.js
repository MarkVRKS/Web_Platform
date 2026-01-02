const db = require('../config/db')

const User = {
    create: (nickname, email, passwordHash, callback) => {
        const sql = 'INSERT INTO users (nickname, email, password_hash) VALUES (?, ?, ?)';
        db.query(sql, [nickname, email, passwordHash], callback);
    },

    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    },

    findByNickname: (nickname, callback) => {
        const sql = 'SELECT * FROM users WHERE nickname = ?';
        db.query(sql, [nickname], callback);
    }
};

module.exports = User;