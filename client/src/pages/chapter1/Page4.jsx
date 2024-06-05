import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page4 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">성냥에 불을 붙여 랜턴을 켜고 양초 또한 챙겼다. 그리고 랜턴을 들고 주위를 둘러보니 문이 열려있었다.</div>,
    <div className="text">'대체 여긴 어디야!' <br /> 묘한 기분에 입 밖으로 내뱉지 못한 말을 되뇌었다.</div>,
    <div className="text">문 밖으로 나가니 그곳은 끝에 문이 있었고 양 옆에도 문이 각각 하나씩 있었다 <br /> "덜컥 덜컥" 문을 열어보려 했지만 잠겨있었다.</div>,
    <div className="text">'다른 방을 들어가봐야 하는걸까...'</div>,
    <img src="../chapter1Img/4.png" alt="이미지4" className="image" />,
    <div className="text">오른쪽 문으로 들어가시겠습니까? <br />왼쪽 문으로 들어가시겠습니까?</div>,
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
      const pageId = 'chapter1-page4'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "왼쪽") {
      navigate('/chapter1/page5');
    } else if (choice === "오른쪽") {
      navigate('/chapter1/page6');
    } else {
      navigate('/chapter1/page4');
    }
  };

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <div className="choices">
          <button onClick={() => handleChoice("오른쪽")}>오른쪽</button>
          <button onClick={() => handleChoice("왼쪽")}>왼쪽</button>
        </div>
      )}
    </div>
  );
};

export default Page4;
