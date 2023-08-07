const { Sequelize } = require("sequelize");
const config = require("../../config");
const { url } = config.postgres;

const sequelize = new Sequelize(url);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync()

    console.log("Postgres Connected");
  } catch (err) {
    console.log("Postgres Connection Failed", err);
  }
};

module.exports = {
  testDbConnection,
  sequelize
};
