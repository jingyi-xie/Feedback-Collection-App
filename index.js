const express = require("express"); // import express (common js modules)
const app = express();

app.get("/", (req, res) => {
  res.send({ hello: "world" });
}); // route handler of GET method

const PORT = process.env.PORT || 5000;
app.listen(PORT); // tell Node to listen on which port
