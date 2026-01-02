import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // декодируем JWT токен

function Navbar() {
  const [userNickname, setUserNickname] = useState(null);
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserNickname(decoded.nickname);
      } catch {
        setUserNickname(null);
        localStorage.removeItem('token');
      }
    } else {
      setUserNickname(null);
    }
  };

  useEffect(() => {
    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUserNickname(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/">Главная</Link>
      </div>
      <div className="navbar-title" style={{ flex: 1, textAlign: 'center', fontWeight: '700', fontSize: '22px' }}>
        dotCourse
      </div>
      <div className="navbar-links">
        {!userNickname ? (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        ) : (
          <>
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-nickname">{userNickname}</span>
            </div>
            <button className="logout-btn" onClick={logout}>Выйти</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


