const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./src/db/db");

const PORT = process.env.PORT || 9000;
const app = express();

sequelize.connectDB();

//* MIDDLEWARES
//* Parse application/json
app.use(bodyParser.json());
//* Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//* ROUTES

//* Error handler
app.use((err, req, res, next) => {
  console.log("\x1b[31m", "*******************************************");
  console.log("\x1b[31m", "ERROR HANDLER:");
  console.log(err);
  console.log("\x1b[31m", "*******************************************");
  //TODO curate errors and return info
  res.send("some error");
});

//* Assign the port number and run server
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
