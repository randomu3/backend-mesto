import { ObjectId } from "mongoose";

export interface TJwtPayload {
  _id: ObjectId | string
}