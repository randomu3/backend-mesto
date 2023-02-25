// middlewares/auth.ts

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TJwtPayload } from "utils/types";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, "some-secret-key") as TJwtPayload;
    req.user = payload
  } catch (err) {
    res.status(401).send({ message: "Необходима авторизация" });
    return next(err);
  }

  next(); // пропускаем запрос дальше
};
