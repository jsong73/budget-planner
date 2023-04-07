const express = require("express");
const app = express();
const sequelize = require("./config/connection")
const PORT = process.env.PORT || 3001;

//to connect to port using express
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, (err) => console.log(`listening to port ${PORT}`));
  });
  