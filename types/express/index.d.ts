import { ObjectId, Schema } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: { _id: string | ObjectId };
    }
  }
}
