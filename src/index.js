const express = require("express");

const app = express();

// middlewares
app.use(express.json());

// PORT CONFIGURATION
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`App is listining on port ${port}`));
