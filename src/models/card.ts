import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: Array<ObjectId> | undefined;
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    required: true
  },
  likes: {
    type: Array<ObjectId>,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('card', cardSchema)