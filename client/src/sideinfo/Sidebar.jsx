// src/components/Sidebar.jsx

import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
      <li className="sidebar-item" style={{ backgroundImage: "url('/내정보.png')" }}>
      <Link to="/mypage">내정보</Link>
        </li>
        <li className="sidebar-item" style={{ backgroundImage: "url('/사이드1.png')" }}>
        <Link to="/ClearedPages">스토리</Link>
        </li>
        <li className="sidebar-item" style={{ backgroundImage: "url('/사이드2.png')" }}>
          <a href="#images">획득한 이미지</a>
        </li>
        <li className="sidebar-item" style={{ backgroundImage: "url('/사이드3.png')" }}>
          <a href="#teammate">동료</a>
        </li>
        <li className="sidebar-item" style={{ backgroundImage: "url('/사이드4.png')" }}>
          <a href="#items">아이템</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
