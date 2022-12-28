const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Adding Cors
app.use(cors());
dotenv.config({ path: "./config.env" });

// Port No
const port = process.env.PORT;

//Connection to mongodb
require("./db/conn");

//Parser
app.use(cookieParser());

app.use(express.json());
//Static path for Image Folder
app.use(
  "/public/Uploads/ProfileImages",
  express.static("public/Uploads/ProfileImages")
);
app.use("/public/Uploads/Resume", express.static("public/Uploads/Resume"));
//link router file
app.use(require("./router/auth"));

//New Way Of Coding
const router = require("./router/userRoutes");
// app.use("/api/v1", router);
app.use(router);

//listen
app.listen(port, () => {
  console.log(`listen to ${port}`);
});
