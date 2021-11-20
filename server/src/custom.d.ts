import { Request } from "express";
export default interface UserAuthInfoRequest extends Request {
  userId?: number;
}
