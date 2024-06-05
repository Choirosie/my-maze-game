// import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         return next(createError(401, "You are not authenticated!"));
//     }
//     jwt.verify(token, process.env.JWT, (err, user) => {
//         if(err) return next(createError(403, "Token is not valid!"));
//         req.user = user;
//         next();
//     });
// };

// export const verifyUser = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         if (req.user.id === req.params.id || req.user.isAdmin) {
//             next();
//         } else {
//             return next(createError(403, " You are not authorized!"));
//         }
//     });
// };

// export const verifyAdmin = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         if (req.user.isAdmin) {
//              next();
//         } else {
//             return next(createError(403, "You are not authorized!"));
//         }
//     });
// };

import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";


export const verifyToken = (req, res, next) => {

  console.log(" 1 ", req.params.id)

  const token = req.cookies.access_token;

  console.log(" 3 ",token )

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }


  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;

    console.log(user)
    // next();
  });
};


export const verifyUser = (req, res, next) => {

  console.log(" 2 " ,req.params.id)

  verifyToken(req, res, next)

  console.log("4",req.user.id)


  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next);
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }

}