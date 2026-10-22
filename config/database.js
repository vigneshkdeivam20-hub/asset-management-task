require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});
const { Sequelize } = require("sequelize");
console.log('Environment variables:', {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

const required = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
);

module.exports = { sequelize };
