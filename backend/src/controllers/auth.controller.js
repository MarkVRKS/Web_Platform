const bcrypt = require('bcrypt'); // bcrypt используется для хеширования (шифрования) паролей
const jwt = require('jsonwebtoken'); // jwt нужен для создания токена авторизации (JWT)
const User = require('../models/user.model'); // модель пользователя — здесь функции для работы с БД
require('dotenv').config(); // подключаем файл .env, чтобы брать секретные данные

// Секретный ключ для подписи JWT
// если в .env нет JWT_SECRET — используется запасной ключ
const SECRET = process.env.JWT_SECRET || 'secret123';

// ================== РЕГИСТРАЦИЯ ==================
exports.register = (req, res) => {

    // получаем данные от клиента (React) через req.body
    const { nickname, email, password } = req.body;

    // проверка на заполнение полей
    if (!nickname || !email || !password) {
        return res.status(400).json({
            message: 'Никнейм, почта и пароль обязательны'
        });
    }

    // проверяем, существует ли пользователь с таким email
    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: err.message }); // ошибка базы данных
        if (results.length > 0) return res.status(400).json({ message: 'Email уже используется' }); // email занят

        // проверяем уникальность никнейма
        User.findByNickname(nickname, (err, results) => {
            if (err) return res.status(500).json({ message: err.message }); // ошибка базы данных
            if (results.length > 0) return res.status(400).json({ message: 'Такой никнейм уже занят' }); // ник занят

            // хешируем пароль перед сохранением в БД
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return res.status(500).json({ message: err.message }); // ошибка при хешировании

                // создаём пользователя в базе данных
                User.create(nickname, email, hash, (err, results) => {
                    if (err) return res.status(500).json({ message: err.message }); // ошибка при создании пользователя

                    // создаём JWT токен
                    // header — алгоритм подписи
                    // payload — данные пользователя
                    // SECRET — секретный ключ
                    // expiresIn — срок действия токена
                    const token = jwt.sign(
                        { id: results.insertId, email, nickname }, // добавляем nickname для фронта
                        SECRET,
                        { expiresIn: '1h' }
                    );

                    // отправляем ответ клиенту
                    res.status(201).json({
                        message: 'Пользователь создан',
                        token
                    });
                });
            });
        });
    });
};

// ================== ВХОД (ЛОГИН) ==================
exports.login = (req, res) => {

    // получаем email и пароль из запроса
    const { email, password } = req.body;

    // проверка на заполненность полей
    if (!email || !password) {
        return res.status(400).json({ message: 'Email и пароль обязательны' });
    }

    // ищем пользователя по email
    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: err.message }); // ошибка базы данных
        if (results.length === 0) return res.status(400).json({ message: 'Пользователь не найден' }); // пользователь не найден

        const user = results[0]; // берём первого найденного пользователя

        // сравниваем введённый пароль с хешем из БД
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) return res.status(500).json({ message: err.message }); // ошибка при сравнении
            if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' }); // неверный пароль

            // если всё верно — создаём JWT токен
            const token = jwt.sign(
                { id: user.id, email: user.email, nickname: user.nickname }, // добавляем nickname для фронта
                SECRET,
                { expiresIn: '1h' }
            );

            // отправляем токен клиенту
            res.json({
                message: 'Вход успешен',
                token
            });
        });
    });
};
