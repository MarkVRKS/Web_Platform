import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import "../style/glowButton.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // для ошибок
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setMessage(''); // очищаем сообщение об ошибке
      navigate('/'); // перенаправляем на главную
      window.dispatchEvent(new Event('storage')); // чтобы Navbar обновился сразу
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Вход</h2>
      <input 
        type="email" 
        placeholder="Email" 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
      <button className="glow-on-hover" type="submit">Войти</button>
      {message && <p style={{color:'red', marginTop:'10px'}}>{message}</p>}
    </form>
  );
}

export default Login;
