import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  email: string;
  college?: string;
  year?: string;
  profileImage?: string;
  savedPosts: mongoose.Types.ObjectId[]; // Array of Post IDs
  timelineTasks: { id: string; text: string; color: string }[];
  schedule: { id: string; title: string; startTime: string; duration: number }[];
  notifications: { message: string; date: Date }[];
  // Add more fields as needed
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String },
  year: { type: String },
  profileImage: { type: String },
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
  timelineTasks: [{
    id: { type: String, required: true },
    text: { type: String, required: true },
    color: { type: String, default: 'bg-btggreen' }
  }],
  schedule: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    startTime: { type: String, required: true },
    duration: { type: Number, required: true }
  }],
  notifications: [
    {
      message: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  // Add more fields as needed
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema); 