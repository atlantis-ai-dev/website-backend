const db = require("../config/database");
const bcrypt = require("bcrypt");
const userQueries = require("../queries/user.queries");
const logger = require("../logger");

const registerUser = async (req, res) => {
    const saltRounds = 10;
  
    const client = await db.connect();
  
    try {
      await client.query('BEGIN');
  
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        throw { status: 400, message: "Missing required fields" };
      }
  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const [firstName = '', lastName = ''] = username.split(" ");
  
      const sql = userQueries.createUser;
      const values = [email, username, hashedPassword, firstName, lastName];
  
      const result = await client.query(sql, values);
      const user = result.rows[0];
  
      await client.query('COMMIT');
  
      const response = {
        status: 200,
        message: "User Registered Successfully",
        data: {
          id: user.id,
          email: user.email,
          username: user.username
        }
      };
  
      logger.info(response);
      return response;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error(error);
      return res.status(error.status || 500).json({
        status: "failed",
        message: error.message || "Internal Server Error"
      });
    } finally {
      client.release();
    }
  };
  

  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const sql = userQueries.loginUser;
      const result = await db.query(sql, [email]);
  
      if (result.rows.length === 0) {
        throw { status: 404, message: "User not found" };
      }
  
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        throw { status: 401, message: "Invalid credentials" };
      }
  
      const response = {
        status: 200,
        message: "User Login Successful",
        data: {
          id: user.id,
          email: user.email,
          username: user.username
        }
      };
  
      logger.info(response);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(error);
      return res.status(error.status || 500).json({
        status: "failed",
        message: error.message || "Internal Server Error"
      });
    }
  };


module.exports = {
    registerUser,
    login,
}