const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

app.use("/api", userRouter);
app.use("/api", taskRouter);

const URL = process.env.MONGODB;
mongoose
  .connect(URL, {})
  .then(() => {
    console.log("BD is now connected!");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(5001, () => {
  console.log("servidor corriendo en el puesto 5001!");
});
