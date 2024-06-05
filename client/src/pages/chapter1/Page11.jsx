import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page11 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">그래..30이었어! 이건 3자리니까 030...</div>,
    <div className="text">문을 여니 방 안에는 한 남자가 있었다.<br />"감사합니다! 감사합니다!"</div>,
    <div className="text">연신 인사를 하는 그의 손을 보니 문을 열려했던건지 온통 상처투성이였다.</div>,
    <div className="text">"혹시...어쩌다가 이곳에 오셨어요?"</div>,
    <div className="text">내 물음에 그 남자 역시 정신을 차려보니 이 곳에 있었다고 한다.<br />우리는 서로 통성명을 했고 간단한 질문을 주고받았다.</div>,
    <div className="text">"저한테 다른 열쇠가 하나 있는데 이곳 복도 끝에 있는 문의 열쇠같아요."</div>,
    <div className="text">"일단 저희도 이곳에서 나가죠!"</div>,
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
    alert("동료 승호 획득"); // 알림창
    setShowChoices(false);
    setCurrentStep(0); // 처음으로 리셋

    if (user) {
      const pageId = 'chapter1-page11'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "나간다") {
      navigate('/chapter1/page8');
    } else {
      navigate('/chapter1/page1');
    }
  };

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
      {showChoices && (
        <div className="choices">
          <button onClick={() => handleChoice("나간다")}>나간다</button>
        </div>
      )}
    </div>
  );
};

export default Page11;
