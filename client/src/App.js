import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
 } from "react-router-dom";
import Home from './components/Home';
import CP1 from './pages/chapter1/Page1';
import CP2 from './pages/chapter1/Page2';
import CP3 from './pages/chapter1/Page3';
import CP4 from './pages/chapter1/Page4';
import CP5 from './pages/chapter1/Page5';
import CP6 from './pages/chapter1/Page6';
import CP7 from './pages/chapter1/Page7';
import CP8 from './pages/chapter1/Page8';
import CP9 from './pages/chapter1/Page9';
import CP10 from './pages/chapter1/Page10';
import CP11 from './pages/chapter1/Page11';
import C1E from './pages/chapter1/Chapter1Ending';
import Register from './components/Register';
import Login from './components/Login';
import Mypage from './components/Mypage';
import Story from './sideinfo/ClearedPages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter1/page1" element={<CP1 />} />
        <Route path="/chapter1/page2" element={<CP2 />} />
        <Route path="/chapter1/page3" element={<CP3 />} />
        <Route path="/chapter1/page4" element={<CP4 />} />
        <Route path="/chapter1/page5" element={<CP5 />} />
        <Route path="/chapter1/page6" element={<CP6 />} />
        <Route path="/chapter1/page7" element={<CP7 />} />
        <Route path="/chapter1/page8" element={<CP8 />} />
        <Route path="/chapter1/page9" element={<CP9 />} />
        <Route path="/chapter1/page10" element={<CP10 />} />
        <Route path="/chapter1/page11" element={<CP11 />} />
        <Route path="/chapter1/Chapter1Ending" element={<C1E />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/sideinfo/ClearedPages" element={<Story />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
