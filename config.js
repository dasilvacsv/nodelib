// Set environment variables
const PORT = process.env.PORT || 3000;
const PG_PORT = process.env.PG_PORT || 5432;
const PG_HOST = process.env.PG_HOST || "localhost";
const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "xBerh123";
const PG_DATABASE = process.env.PG_DATABASE || "taskdb";
const ORIGIN = process.env.ORIGIN || "http://localhost:5173";
const JWT_SECRET = process.env.JWT_SECRET || "xyz123";

// Export the variables
module.exports = {
  PORT,
  PG_PORT,
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  ORIGIN,
  JWT_SECRET
};
