import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  photo: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
  },
  diets: {
    type: Object,
    required: false,
  },
  goal: {
    type: Object,
    required: false,
  },
  person: {
    type: Object,
    required: false,
  },
  waterIntake: {
    type: Number,
    required: false,
  },
  daysWaterGoalMet: {
    type: Boolean,
    required: false,
  },
  daysSleepGoalMet: {
    type: Number,
    required: false,
    default: 0,
  },
  daysMeditationGoalMet: {
    type: Number,
    required: false,
    default: 0,
  },
  achievements: {
    type: Object,
    required: false,
  },
  
});

const User = models?.User || model("User", UserSchema, "Nutrixa_Users");

export default User;
