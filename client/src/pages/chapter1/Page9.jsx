import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page9 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

const steps = [
    <div className="text">문에는 3개의 숫자를 맞춰야 되는 자물쇠가 있었다</div>,
    <div className="text">자물쇠를 살피는 중에 맞은편에서 인기척과 함께 <br />"살려주세요..."라는 남자의 목소리가 들려온다</div>,
    <div className="text">문을 여시겠습니까?</div>,
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

  const handleChoice = async (choice) => {
    alert(`선택: ${choice}`);
    setShowChoices(false);
    setCurrentStep(0); // 처음으로 리셋

    if (user) {
      const pageId = 'chapter1-page9'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "연다") {
      navigate('/chapter1/page10');
    } else {
      navigate('/chapter1/page8');
    }
  };


  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <div className="choices">
          <button onClick={() => handleChoice("연다")}>연다</button>
          <button onClick={() => handleChoice("열지 않는다")}>열지 않는다</button>
        </div>
      )}
    </div>
  );
};

export default Page9;
