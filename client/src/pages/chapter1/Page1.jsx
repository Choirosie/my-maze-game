import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">그날따라 어쩐지 우울한 기분이 드는 날이었다.</div>,
    <div className="text">'그나저나 버스는 왜 이렇게 늦는거야' <br /> 마음속으로 불평하는 중에 저 멀리서 빛이 보인다.</div>,
    <img src="../chapter1Img/1.png" alt="이미지1" className="image" />,
    <div className="text">버스를 탑승하시겠습니까?</div>,
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
      setIsDisabled(true);
    }
  };

  const handleChoice = async (choice) => {
    alert(`선택: ${choice}`);
    setShowChoices(false);
    setCurrentStep(0); // 처음으로 리셋

    if (user) {
      const pageId = 'chapter1-page1'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "탑승한다") {
      navigate('/chapter1/page2');
    } else {
      navigate('/chapter1/page2');
    }
  };

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <div className="choices">
          <button onClick={() => handleChoice("탑승한다")}>탑승한다</button>
          <button onClick={() => handleChoice("탑승하지 않는다")} disabled={isDisabled}>탑승하지 않는다</button>
        </div>
      )}
    </div>
  );
};

export default Page1;
