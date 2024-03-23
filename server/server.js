const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./config/db");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// to destructure json type data from user as reqest
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// const userRoute = require("./routes/userRoutes");
app.use("/api/user", userRouter);

const http = require("http").createServer(app);
const port = process.env.PORT;
const server = http.listen(port, () => {
  console.log("server running");
});
