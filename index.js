const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8080;

//middleware  => yeh jo form data ata hai usse body mai add krne ka kaam karta hai
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.end("Home Page");
});

app.get("/users", (req, res) => {
  //this  is server side rendering
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li> `).join("")}
  </ul>`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  //GET ALL USERS
  return res.json(users); // return all the users in json format
});

//for same route we can use get,put,delete
app
  .route("/api/user/:id")
  .get((req, res) => {
    const id = Number(req.params.id); // Extracts the user ID from the URL and converts it to a number.
    const user = users.find((user) => user.id === id); // Finds the user with the matching ID in the users array.
    if (!user) return res.status(404).json({ error: "User not found" }); // If the user is not found, return a 404 error.
    res.json(user); // If found, return the user data in JSON format.
  })

  .patch((req, res) => {
    const id = Number(req.params.id); // Extracts the user ID from the URL and converts it to a number.
    const userIndex = users.findIndex((user) => user.id === id); // Finds the index of the user with the matching ID.
    if (userIndex === -1)
      return res.status(404).json({ error: "User not found" }); // If the user is not found, return a 404 error.
    users[userIndex] = { ...users[userIndex], ...req.body }; // Update the user object with the new data from the request body.
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      // Write the updated users array back to the JSON file.
      if (err) return res.status(500).json({ error: "Internal Server Error" }); // If there's an error writing the file, return a 500 error.
      res.json({ status: "Success", user: users[userIndex] }); // If successful, return the updated user data.
    });
  })

  .delete((req, res) => {
    const id = Number(req.params.id); // Extracts the user ID from the URL and converts it to a number.
    const userIndex = users.findIndex((user) => user.id === id); // Finds the index of the user with the matching ID.
    if (userIndex === -1)
      return res.status(404).json({ error: "User not found" }); // If the user is not found, return a 404 error.
    users.splice(userIndex, 1); // Remove the user from the users array.
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      // Write the updated users array back to the JSON file.
      if (err) return res.status(500).json({ error: "Internal Server Error" }); // If there's an error writing the file, return a 500 error.
      res.json({ status: "Success", message: "User deleted successfully" }); // If successful, return a success message.
    });
  });

app.post("/api/user", (req, res) => {
  //it is used to create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Pending", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on Port number ${PORT}`);
});
