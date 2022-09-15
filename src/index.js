const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error");
const routes = require("./routes");

const app = express();

// DB Connection
mongoose
  .connect("mongodb://localhost:27017/auth-db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB`, error));

// middlewares
app.use(express.json());

// API Endpoints
app.use("/api", routes);

// Custom Middlewares
app.use(errorHandler);

// PORT CONFIGURATION
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`App is listining on port ${port}`));
