import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page10 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [userChoice, setUserChoice] = useState(''); // userChoice 상태 추가
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">'그래 열어주자...열어주는거야!'<br />"잠시만 기다리세요!"</div>,
    <div className="text">마음속에 작은 불안감이 있었지만 차마 외면할 수 없었다.</div>,
    <img src="../chapter1Img/7.png" alt="이미지7" className="image" />,
    <div className="text">'여기에 쓸만한 번호가 뭐가 있을까..?'<br />'아까 열쇠와 함께 있던 쪽지가 그냥 있진 않았을꺼야'</div>,
    <div className="text">그러면 자물쇠 비밀번호는...</div>,
  ];

  const saveClearedPage = async (pageId, userId) => {
    try {
      console.log("11", "saveClearedPage")
      const response = await axios.post(
        `${apiUrl}/clearedPages/${userId}`, 
         {pageId:pageId, userId:userId} , {withCredentials: true }
      );
      console.log("12", response.data)
      return response.data;
    } catch (error) {
      console.error('Error saving cleared page:', error);
      throw error;
    }
  };

  const handleClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowChoices(true);
    }
  };

  const handleInputChange = (event) => {
    setUserChoice(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    handleChoice(userChoice);
  };

  const handleChoice = async (choice) => {
    alert(`선택: ${choice}`);
    setShowChoices(false);
    setCurrentStep(0); // 처음으로 리셋
    setUserChoice(''); // userChoice 상태 초기화

    if (user) {
      const pageId = 'chapter1-page10'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }
    
    if (choice === "030") {
      navigate('/chapter1/page11');
    } else {
      navigate('/chapter1/page5');
    }
  };

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <form className="choices" onSubmit={handleInputSubmit} onClick={(e) => e.stopPropagation()}>
          <input 
            type="text" 
            value={userChoice} 
            onChange={handleInputChange} 
            placeholder="자물쇠 비밀번호"
          />
          <button type="submit">확인</button>
        </form>
      )}
    </div>
  );
};

export default Page10;
