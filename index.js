const express = require("express");

const app = express();
require("dotenv").config();
PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/detabase").dbconnection();

const user = require("./routes/user");
app.use("/api/v1", user);

// testing route
app.get("/", (req, res) => {
  return res.send("<h1>hello darling</h1>");
});

app.listen(PORT, () => {
  console.log(`listiing on port ${PORT}`);
});
