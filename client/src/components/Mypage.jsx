import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Mypage.css';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from '../sideinfo/Sidebar';

const Mypage = () => {
  const [mpData, setMpData] = useState({
    username: '',
    email: '',
    img: '',
    password: '',
  });

  const [newImage, setNewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setMpData({
        username: user.username,
        email: user.email,
        img: user.img,
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files) {
      setNewImage(files[0]);
    } else {
      setMpData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const userId = user._id;
      const updatedData = { ...mpData };

      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);
        const uploadRes = await axios.put(`${apiUrl}/users/${userId}/profile-image`, formData, { withCredentials: true });
        updatedData.img = uploadRes.data.filePath;
      }

      // Remove password from updatedData if it is empty
      if (!updatedData.password) {
        delete updatedData.password;
      }

      const res = await axios.put(`${apiUrl}/users/${userId}`, updatedData, { withCredentials: true });
      alert("프로필이 성공적으로 업데이트되었습니다!");
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setEditMode(false);
      navigate("/mypage");
    } catch (err) {
      console.error(err);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const userId = user._id;
      await axios.delete(`${apiUrl}/users/${userId}`, { withCredentials: true });
      alert("계정이 성공적으로 삭제되었습니다.");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("계정 삭제 중 오류가 발생했습니다.");
    }
  };

  const { username, email, img, password } = mpData;

  return (
    <div>
      <Navbar />
      <div className="mypage-container">
      <Sidebar />
        {editMode ? (
          <div className="edit-profile-modal">
            <h2>프로필 편집</h2>
            <div className="form-group">
              <label htmlFor="profilePicture">프로필 사진</label>
              <input
                type="file"
                id="profilePicture"
                name="img"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">닉네임</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Leave empty to keep current password"
              />
            </div>
              <button onClick={handleSave} className="mpsubmit-btn">저장</button>
          </div>
        ) : (
          <>
            {img && <img src={`${process.env.REACT_APP_API_IMAGE_URL}${img}`} alt="Profile" className="profile-image" />}
            <div className="top-container">
              <h2>내정보</h2>
            </div>
            <div className="user-info">
              <p><strong>닉네임:</strong> {username}</p>
              <p><strong>이메일:</strong> {email}</p>
            </div>
            <div className="mpbutton-container">
              <button onClick={handleEdit} className="mpedit-btn">수정</button>
              <button onClick={handleDelete} className="mpdelete-btn">탈퇴</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mypage;
