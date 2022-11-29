const { Sequelize } = require("sequelize");

//* Get db variales according environment
const config = require(process.cwd() + "/config/config.json")[process.env.NODE_ENV];

//* Connect to db
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: config.dialect }
);

sequelize.connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Succesfully connected to database");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

module.exports = {
  sequelize: sequelize,
};
