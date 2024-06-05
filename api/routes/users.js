import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    updateProfileImage
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import upload from "../utils/upload.js";

const router = express.Router();

// 유저 정보 업데이트
router.put("/:id", verifyUser, updateUser);

// 유저 삭제
router.delete("/:id", verifyUser, deleteUser);

// 특정 유저 정보 조회
router.get("/:id", verifyUser, getUser);

// 모든 유저 정보 조회
router.get("/", verifyAdmin, getUsers);

// 프로필 이미지 업데이트
router.put("/:id/profile-image", verifyUser, upload.single('file'), updateProfileImage);

export default router;
