import mongoose, { Document, Schema } from 'mongoose';

export interface ISlide {
  type: 'image' | 'text';
  title?: string; // for text slides only
  content: string; // image URL or text content
  isTitle?: boolean; // for text slides only
}

export interface IPost extends Document {
  title: string;
  category: string;
  slides: ISlide[];
  author: string;
  createdAt: Date;
}

const SlideSchema: Schema = new Schema({
  type: { type: String, enum: ['image', 'text'], required: true },
  title: { type: String }, // optional, only for text slides
  content: { type: String, required: true },
  isTitle: { type: Boolean }, // optional, only for text slides
});

const PostSchema: Schema<IPost> = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  slides: { type: [SlideSchema], required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>('Post', PostSchema); 