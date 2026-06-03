import { Router } from 'express'
import { Activity } from '../models/activity.model.js'
import { LeaderboardEntry } from '../models/leaderboard.model.js'
import { Team } from '../models/team.model.js'
import { User } from '../models/user.model.js'
import { Workout } from '../models/workout.model.js'

const router = Router()

router.get('/users', async (_req, res) => {
  const users = await User.find().select('firstName lastName email role team createdAt')
  res.json(users)
})

router.get('/teams', async (_req, res) => {
  const teams = await Team.find().populate('members', 'firstName lastName email')
  res.json(teams)
})

router.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find().select('title category intensity durationMinutes')
  res.json(workouts)
})

router.get('/activities', async (_req, res) => {
  const activities = await Activity.find()
    .populate('user', 'firstName lastName email')
    .populate('workout', 'title category')
  res.json(activities)
})

router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ rank: 1, score: -1 })
    .limit(25)
    .populate('user', 'firstName lastName')
    .populate('team', 'name')
  res.json(leaderboard)
})

export default router
