const express = require("express");
const app = express();
const db = require("./config/connection")
const PORT = process.env.PORT || 3001;

db.once("open", () => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
})