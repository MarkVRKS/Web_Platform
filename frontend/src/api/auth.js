const API_URL = "http://localhost:5000/api/auth";

export async function login(email, password) {
    // юзаю функцию фетч для отправки http-запроса на сервак. формируя url и добавляя его к базовому апи_юрл. await для ожидания завершения запроса
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(nickname, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, email, password })
  });
  return res.json();
}
