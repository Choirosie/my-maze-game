import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page5 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const steps = [
    <div className="text">'문이 열려있다!'<br /> 문을 열고 조심히 안으로 들어섰다.</div>,
    <div className="text">방 안에는 물건이 별로 없었다. 이리 저리 살피는 도중 책상 위에서 열쇠를 발견했다</div>,
    <div className="text">'복도 끝 열쇠일까?'<br />열쇠 밑에는 종이가 있었다.</div>,
    <div className="text">'이게....뭐지?'<br />종이에는 수식이 적혀 있었다.</div>,
    <img src="../chapter1Img/5.png" alt="이미지5" className="image" />,
    <div className="text">'혹시 모르니 답을 잘 외워두자'</div>,
  ];

  useEffect(() => {
    // 컴포넌트가 마운트될 때 showChoices를 초기화합니다.
    setShowChoices(false);
  }, []);

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

  const handleChoice = async (choice) => {
    alert(`선택: ${choice}`); // 알림창
    setShowChoices(false);
    setCurrentStep(0); // 처음으로 리셋

    if (user) {
      const pageId = 'chapter1-page5'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "네") {
      navigate('/chapter1/page7');
    } else {
      navigate('/chapter1/page7');
    }
  };

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <div className="choices">
          <button onClick={() => handleChoice("네")}>네</button>
        </div>
      )}
    </div>
  );
};

export default Page5;
