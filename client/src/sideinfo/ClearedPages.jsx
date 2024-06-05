import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

// 클리어한 페이지 목록 가져오기 함수
const getClearedPages = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/clearedPages/${userId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('클리어한 페이지 목록 가져오기 중 오류:', error);
    throw error;
  }
};

const ClearedPages = () => {
  const [clearedPages, setClearedPages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchClearedPages = async () => {
      try {
        if (user && user._id) {
          const pages = await getClearedPages(user._id);
          setClearedPages(pages);
        }
      } catch (error) {
        console.error('클리어한 페이지 목록 가져오기 중 오류:', error);
      }
    };

    fetchClearedPages();
  }, [user]);

  return (
    <div>
      <h2>클리어한 페이지 목록</h2>
      <ul>
        {clearedPages.map(page => (
          <li key={page._id}>{page.pageId} - {new Date(page.clearedAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClearedPages;
