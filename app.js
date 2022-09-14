require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(cors());
app.use(express.json());
//routes
//http://localhost:5000/api
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connectted to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
