import axios from "axios";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../css/Login.css';
import Navbar from './Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/auth/login`, formData, { withCredentials: true });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login-background">
      <Navbar />
      <div className="login-container">
        <form className="login-form">
          <h2>로그인</h2>
          <div className="login-form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              placeholder="E-MAIL"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              placeholder="PASSWORD"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button disabled={loading} onClick={handleClick} className="login-submit-btn">
            로그인
          </button>
          <br />{error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
