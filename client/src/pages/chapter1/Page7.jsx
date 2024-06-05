import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page7 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">열쇠를 챙겨 문 밖으로 나갔다.</div>,
    <div className="text">'이제...어디로 가야할까?'</div>,
    <div className="text">복도 끝 문으로 가보자<br />오른쪽 문으로 가보자</div>
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
      const pageId = 'chapter1-page7'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "복도 끝 문") {
      navigate('/chapter1/page8');
    } else {
      navigate('/chapter1/page9');
    } 
}

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <div className="choices">
          <button onClick={() => handleChoice("복도 끝 문")}>복도 끝 문</button>
          <button onClick={() => handleChoice("오른쪽 문")}>오른쪽 문</button>
        </div>
      )}
    </div>
  );
};

export default Page7;
