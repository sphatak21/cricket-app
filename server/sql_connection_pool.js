// Import the mysql package
import mysql from "mysql2"; 

let pool;

const initializePool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Bh@kri123',
      database: 'cricketApp',
      waitForConnections: true,
      connectionLimit: 1
    });
  }
  return pool;
};


// Export the pool for use in other modules
export default initializePool();
