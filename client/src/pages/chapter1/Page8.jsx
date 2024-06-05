import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page8 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">나는 복도 끝 문으로 달렸다.</div>,
    <div className="text">문에 열쇠를 꽂아아보니 딱 맞았다.</div>,
    <div className="text">찰칵이는 소리와 함께 문이 열렸다.</div>,
    <div className="text">'아! 다행이다...'<br />열린 문으로 한걸음 내딛었다.</div>,
    <img src="../chapter1Img/6.png" alt="이미지6" className="image" />,
    <div className="text">나가시겠습니까?</div>
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

  useEffect(() => {
    // 컴포넌트가 마운트될 때 showChoices를 초기화합니다.
    setShowChoices(false);
  }, []);

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
      const pageId = 'chapter1-page8'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "문 밖") {
      navigate('/chapter1/Chapter1Ending');
    } else {
      navigate('/chapter1/page1');
    }
  };

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <div className="choices">
          <button className="EndingBTN" onClick={() => handleChoice("문 밖")}>네</button>
        </div>
      )}
    </div>
  );
};

export default Page8;
