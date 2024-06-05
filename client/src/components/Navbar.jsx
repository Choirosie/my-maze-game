import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'; 
import "../css/Navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true }); // 쿠키값 삭제 추가
      dispatch({ type: "LOGOUT" }); // dispatch값은 AuthContext에 있음
      console.log(res.data);
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGOUT_FAILURE", payload: err.response ? err.response.data : "Network Error" });
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={handleLogoClick}>
          처음으로
        </span>
        {user ? (
          <div className="navItems">
            <span className="navUsername">{user.username}님 환영합니다!</span> {/* 유저네임 표시 */}
            <button className="navButton" onClick={() => navigate('/mypage')}>내정보</button>
            <button onClick={handleClick} className="navButton">
              로그아웃
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={() => navigate('/register')}>회원가입</button>
            <button className="navButton" onClick={() => navigate('/login')}>로그인</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
