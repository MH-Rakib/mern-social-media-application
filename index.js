const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 5000;

//External imports
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

mongoose.connect(process.env.CONNECTION_STRING, () => {
  console.log("DB Connected Successfully.");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Root URL");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log("Listening To Port" + port);
});
