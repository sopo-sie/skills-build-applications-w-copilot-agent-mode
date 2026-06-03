import { Document, Model, Schema, Types, model } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  workout?: Types.ObjectId
  type: string
  durationMinutes: number
  caloriesBurned?: number
  performedAt: Date
  notes?: string
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: Schema.Types.ObjectId, ref: 'Workout' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number },
    performedAt: { type: Date, required: true, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true },
)

export const Activity: Model<IActivity> = model<IActivity>('Activity', activitySchema)
