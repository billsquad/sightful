import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// @ts-ignore
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const isCustomAuth = token?.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "replaceItWithSecret");

      // @ts-ignore
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // @ts-ignore
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {}
};

export default auth;
