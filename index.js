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
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //it is used to update user
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    //it is used to delete user
    return res.json({ status: "Pending" });
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
