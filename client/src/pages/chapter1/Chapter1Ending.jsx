import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Chapter1.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Chapter1Ending = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const steps = [
    <div className="text">......</div>,
    <div className="text">이 때의 나는 이것은 시작이었다는 것을 꿈에도 생각하지 못했다.</div>,
    <div className="text">나는....</div>,
    <div className="text">미궁<br />CHAPTER1<br />초대</div>,
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

  const handleClick = async () => {

    if (user) {
      const pageId = 'chapter1-Chapter1Ending'; // 현재 페이지의 ID
      await saveClearedPage(pageId, user._id); // 페이지 클리어 정보 저장
    } else {
      console.error('User is not authenticated');
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/'); // 필요에 따라 다른 경로로 변경하세요
    }
  };

  return (
    <div className="home" onClick={handleClick}>
      {steps[currentStep]}
    </div>
  );
};

export default Chapter1Ending;
