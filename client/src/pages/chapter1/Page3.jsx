import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Page3 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [userChoice, setUserChoice] = useState(''); // userChoice 상태 추가
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">정신이 들며 급히 일어났으나 아직 조금 어지러운 머리를 부여잡고 생각했다.</div>,
    <div className="text">'그래...난 분명 407번 버스를 탔어...그리고...정신을 잃었었지!' </div>,
    <div className="text">'여긴 대체 어디야???' <br /> 위에 달린 자그마한 창문으로부터 들어오는 빛에 의지해 주변을 둘러보았다. </div>,
    <div className="text">내 앞에는 성냥과 랜턴, 양초가 놓여있었다. 다른 곳으로 이동하기 위해서는 이 물건들을 챙겨야 할 것 같다. </div>,
    <img src="../chapter1Img/3.png" alt="이미지3" className="image" />,
    <div className="text">일단 불부터 켤까....</div>,
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
      const pageId = 'chapter1-page3'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (choice === "성냥") {
      navigate('/chapter1/page4');
    } else {
      navigate('/chapter1/page3');
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
            placeholder="어떤것을 먼저 켜야될까?"
          />
          <button type="submit">확인</button>
        </form>
      )}
    </div>
  );
};

export default Page3;
