import { Document, Model, Schema, Types, model } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId
  team?: Types.ObjectId
  score: number
  rank: number
  period: 'daily' | 'weekly' | 'monthly'
  createdAt: Date
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    period: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  },
  { timestamps: true },
)

export const LeaderboardEntry: Model<ILeaderboardEntry> = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema)
