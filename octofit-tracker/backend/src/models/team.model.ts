import { Document, Model, Schema, Types, model } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description?: string
  members: Types.ObjectId[]
  createdAt: Date
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

export const Team: Model<ITeam> = model<ITeam>('Team', teamSchema)
