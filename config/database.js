const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  //  'postgres://postgres:1234@localhost:5432/alml',
  process.env.DATABASE_URL,
  {
    host: "localhost",
    dialect: "postgres",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    ssl: true,
    // dialectOptions: {ssl: {
    //   'require':true,
    //   "rejectUnauthorized": false
      
    // }}
    // logging: false,
  }
);
