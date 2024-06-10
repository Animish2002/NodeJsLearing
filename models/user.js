const mongoose = require("mongoose");

//schema defined
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

//model defined
const User = mongoose.model("User", userSchema); // using the User model created here we can perform CRUD operations

module.exports = User;
