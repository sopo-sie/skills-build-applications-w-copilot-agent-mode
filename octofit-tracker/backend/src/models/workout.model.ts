import { Document, Model, Schema, Types, model } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description: string
  durationMinutes: number
  intensity: 'low' | 'medium' | 'high'
  category: 'strength' | 'cardio' | 'flexibility' | 'mobility'
  recommendedFor: string[]
  createdAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    category: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'mobility'],
      required: true,
    },
    recommendedFor: [{ type: String }],
  },
  { timestamps: true },
)

export const Workout: Model<IWorkout> = model<IWorkout>('Workout', workoutSchema)
