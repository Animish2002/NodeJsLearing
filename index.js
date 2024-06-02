const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("Hello HomePage!");
});

app.get("/about", (req, res) => {
  const { name, lang, feeling } = req.query;
  if (name && lang && feeling) {
    res.send(
      `Hello, this is ${name} learning ${lang} right now and I ${feeling} it`
    );
  } else {
    res.send("Hello About page");
  }
});

app.get("/contact", (req, res) => {
  res.end("Hello Contact Page!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
