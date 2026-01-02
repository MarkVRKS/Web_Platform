import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../style/glowButton.css";

function Register() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = await register(nickname, email, password);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setMessage('');
      navigate('/');
      window.dispatchEvent(new Event('storage')); // Navbar обновляется
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Регистрация</h2>
      <input placeholder="Ваш никнейм" onChange={e => setNickname(e.target.value)} required/>
      <input placeholder="Ваш email" onChange={e => setEmail(e.target.value)} required/>
      <input placeholder="Ваш пароль" type="password" onChange={e =>setPassword(e.target.value)} required/>
      <button className="glow-on-hover" type="submit">Зарегистрироваться</button>
      {message && <p style={{color:'red', marginTop:'10px'}}>{message}</p>}
    </form>
  );
}

export default Register;
