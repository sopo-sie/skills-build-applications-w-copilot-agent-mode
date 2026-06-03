import { Document, Model, Schema, Types, model } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: 'user' | 'coach' | 'admin'
  team?: Types.ObjectId
  createdAt: Date
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'coach', 'admin'], default: 'user' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
)

export const User: Model<IUser> = model<IUser>('User', userSchema)
