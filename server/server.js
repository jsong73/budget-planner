const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/connection");
const {readdirSync} = require("fs")

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route)))

db.once("open", () => { 
  app.listen(PORT, () => {
      console.log(`You are listening to port ${PORT}!`);
    })
  });