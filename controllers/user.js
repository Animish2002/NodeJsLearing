const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id); // Extracts the user ID from the URL and converts it to a number.
  if (!user) return res.status(404).json({ error: "User not found" }); // If the user is not found, return a 404 error.
  res.json(user); // If found, return the user data in JSON format.
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Chopade" });
  res.json({ status: "Success" }); // If successful, return the updated user data.
}

async function handledeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: "Success", message: "User deleted successfully" }); // If successful, return a success message.
}

async function handlecreateNewUser(req, res) {
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
  return res.status(201).json({ msg: "Success!", user: result });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handledeleteUserById,
  handlecreateNewUser
};
