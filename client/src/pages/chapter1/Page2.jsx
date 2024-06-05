import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page2 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [userChoice, setUserChoice] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">'아...깜빡 잠들었나....'</div>,
    <img src="../chapter1Img/2.png" alt="이미지2" className="image" />,
    <div className="text">'이런 도로가 있었던가? ...설마 지나친건 아니겠지?''<br />불안한 마음에 창 밖을 둘러보는 중 몸이 점점 무거워 지는 느낌이 들었다.</div>,
    <div className="text">눈꺼풀이 내려앉으며 정신을 잃기 전 생각했다.</div>,
    <div className="text">'내가.... 몇 번 버스를 탔더라...' </div>,
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
      const pageId = 'chapter1-page2'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "407") {
      navigate('/chapter1/page3');
    } else {
      navigate('/chapter1/page1');
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
            placeholder="번호만입력하세요"
          />
          <button type="submit">확인</button>
        </form>
      )}
    </div>
  );
};

export default Page2;
