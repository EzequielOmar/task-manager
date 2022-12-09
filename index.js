const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./src/db/db");
const passport = require("passport");

require("dotenv").config();
require("./src/middlewares/passport.middlewares");

const PORT = process.env.PORT || 9000;
const app = express();

sequelize.connectDB();

//* ROUTERS
const projectRouter = require("./src/routes/project.routes");
const authRouter = require("./src/routes/auth.routes");

//* MIDDLEWARES
//* Parse application/json
app.use(bodyParser.json());
//* Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//* ROUTES
app.use("/auth", authRouter);
app.use("/project", projectRouter);

//* Error handler
app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message, err: err.err });
});

app.get(
  "/test-route",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user); //* jwt payload data
    res.send("Testing");
  }
);

//* Assign the port number and run server
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
