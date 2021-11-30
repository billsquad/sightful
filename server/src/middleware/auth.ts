import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import UserAuthInfoRequest from "../custom";
import { JwtPayload } from "./interface";

const GOOGLE_AUTH_LENGTH = 500;

const auth = async (
  req: UserAuthInfoRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = (req.headers.authorization as string)?.split(" ")[1];
    const isCustomAuth = token?.length < GOOGLE_AUTH_LENGTH;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(
        token,
        `${process.env.JWT_SECRET}`
      ) as JwtPayload;

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
