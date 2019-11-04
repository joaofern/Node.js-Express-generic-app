const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const users = require("./routes/user");
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const cors = require("cors");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey not defined!");
  process.exit(1);
}

mongoose
  .connect(config.get("db"), {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log(`Connected to ${config.get("db")}`))
  .catch(err => console.log("Couldn't connect to MongoDB", err));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.use("/users", users);
app.use("/auth", auth);
app.use(express.static("public"));

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}...`)
);

module.exports = server;
