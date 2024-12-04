// import mysql from "mysql2/promise";
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,      // Your MySQL host
//   user: process.env.DB_USER,      // Your MySQL username
//   password: process.env.DB_PASS,  // Your MySQL password
//   database: process.env.DB_NAME,  // Your database name
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// export const query = async ({ query, values }) => {
//   const [results] = await pool.execute(query, values); // Executes the query
//   return results;
// };

// export default pool;

import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  debug: true,  // Enable debugging to see MySQL query logs
});

// Query helper function with error handling
export const query = async ({ query, values }) => {
  try {
    const [results] = await pool.execute(query, values);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;  // Re-throw the error after logging it
  }
};

export default pool;
