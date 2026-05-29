import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const dbName = process.env.DB_NAME || "travelmithra";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = Number(process.env.DB_PORT || 5432);

let isDatabaseConnected = false;

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    isDatabaseConnected = true;
    console.log("PostgreSQL connected ✅");
    return true;
  } catch (error) {
    isDatabaseConnected = false;
    console.log("PostgreSQL connection failed ❌");
    console.log(error);
    return false;
  }
};

const getDatabaseStatus = () => isDatabaseConnected;

export { sequelize, connectDB, getDatabaseStatus };