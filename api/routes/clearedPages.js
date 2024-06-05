import express from 'express';
import { saveClearedPage, getClearedPages } from '../controllers/clearedPage.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'; // 토큰 인증 미들웨어

const router = express.Router();

// 클리어한 페이지 저장
router.post('/:id', verifyUser, saveClearedPage);

// 클리어한 페이지 목록 가져오기
router.get('/:id', verifyUser, getClearedPages);

export default router;
