const express = require("express");

const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();
const PORT = 8080;

//Connection with mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("Mongodb Connected!!!"))
  .catch((err) => console.log("Mongo Error", err));

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

//middleware  => yeh jo form data ata hai usse body mai add krne ka kaam karta hai
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.end("Home Page");
});

app.get("/users", async (req, res) => {
  //this  is server side rendering
  const allDbUsers = await User.find({});
  const html = `
  <ul>
  ${allDbUsers
    .map((user) => `<li>${user.firstName} - ${user.email}</li> `)
    .join("")}
  </ul>`;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  //GET ALL USERS
  const allDbUsers = await User.find({});
  return res.json(allDbUsers); // return all the users in json format
});

//for same route we can use get,put,delete
app
  .route("/api/user/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id); // Extracts the user ID from the URL and converts it to a number.
    if (!user) return res.status(404).json({ error: "User not found" }); // If the user is not found, return a 404 error.
    res.json(user); // If found, return the user data in JSON format.
  })

  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Chopade" });
    res.json({ status: "Success" }); // If successful, return the updated user data.
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: "Success", message: "User deleted successfully" }); // If successful, return a success message.
  });

app.post("/api/user", async (req, res) => {
  //it is used to create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    // this will create the user
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "Success!" });
});

app.listen(PORT, () => {
  console.log(`Server running on Port number ${PORT}`);
});
