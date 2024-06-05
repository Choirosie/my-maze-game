import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Home.css';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGameStart = () => {
    if (!user) {
      navigate('/login'); // 로그인이 되어 있지 않으면 로그인 페이지로 리디렉션
    } else {
      navigate('/chapter1/page1'); // 로그인이 되어 있으면 게임 시작 페이지로 이동
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url(/Home.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '100vh'
  };

  return (
    <div>
      <Navbar />
      <div style={backgroundStyle} className="home-container">
        <h1 className="home-title">미 궁</h1>
        <div className="home-link-container">
          <button onClick={handleGameStart} className="home-link">게임시작</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
