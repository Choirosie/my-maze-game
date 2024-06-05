import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import { fileURLToPath } from 'url';
import bcrypt from "bcryptjs";

// ES 모듈에서 __filename과 __dirname을 사용하는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export const updateUser = async (req, res, next) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// };

export const updateUser = async (req, res, next) => {
  //패스워드 해시화 추가
  if (req.body.password) {
      try {
          const salt = bcrypt.genSaltSync(10);
          req.body.password = bcrypt.hashSync(req.body.password, salt);
      } catch (err) {
          return next(err);
      }
  }

  try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
      }, { new: true });
      res.status(200).json(updatedUser);
  } catch (err) {
      next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const updateProfileImage = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const imgPath = req.file.path.replace(/\\/g, "/");

    if (!userId) {
      return next(createError(400, "User ID is required"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user.img) {
      const oldImage = path.join(__dirname, '../', user.img);
      if (fs.existsSync(oldImage)) {
        try {
          fs.unlinkSync(oldImage);
        } catch {
          return next(createError(500, "이미지 삭제 오류"));
        }
      }
    }

    user.img = `/uploads/${req.file.filename}`;
    await user.save();
    res.status(200).json({ message: "Profile image updated", user: { img: `uploads/${req.file.filename}` } });
  } catch (e) {
    next(e);
  }
};
