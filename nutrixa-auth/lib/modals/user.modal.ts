import { Schema, model, models } from "mongoose";

// const dietSchema = new Schema({
//   vegetarian: { type: Boolean, default: false },
//   vegan: { type: Boolean, default: false },
//   halal: { type: Boolean, default: false },
//   kosher: { type: Boolean, default: false },
//   glutenFree: { type: Boolean, default: false },
//   dairyFree: { type: Boolean, default: false },
//   nutFree: { type: Boolean, default: false },
//   other: { type: Boolean, default: false },
//   otherText: { type: String, default: '' }
// });

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
  // weight: {
  //   type: Number,
  //   required: false, 
  // },
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
});

const User = models?.User || model("User", UserSchema, "Nutrixa_Users");

export default User;
