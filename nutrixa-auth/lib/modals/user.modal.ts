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
    unique:true,
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
  weight: {
    type: Number,
    required: false, 
  },
  diets: {
    type: [String], 
    required: false, 
  },
  
});

const User = models?.User || model("User", UserSchema, "Nutrixa_Users");

export default User;
