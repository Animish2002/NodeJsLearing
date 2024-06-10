const express = require("express");

const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handledeleteUserById,
  handlecreateNewUser,
} = require("../controllers/user");

//GET ALL USERS and post new user
router.route("/").get(handleGetAllUsers).post(handlecreateNewUser);

//for same route we can use get,put,delete
router
  .route("/:id")
  .get(handleGetUserById)

  .patch(handleUpdateUserById)

  .delete(handledeleteUserById);



module.exports = router;
