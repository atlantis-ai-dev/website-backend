const userQueries = {
    createUser: `
      INSERT INTO users 
        (email, username, password, first_name, last_name, created_at, last_modified_at)
      VALUES 
        ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `,
  
    loginUser: `
      SELECT id, email, username, password, first_name, last_name 
      FROM users 
      WHERE email = $1
    `,
  
    selectById: `
      SELECT id, email, username, password, created_at, last_modified_at, first_name, last_name
      FROM users 
      WHERE id = $1
    `,
  
    selectByEmail: `
      SELECT id, email, username, password, created_at, last_modified_at, first_name, last_name
      FROM users 
      WHERE email = $1
    `,
  
    selectAllUsers: `
      SELECT id, email, username, password, created_at, last_modified_at, first_name, last_name 
      FROM users
    `,
  
    updateUserById: `
      UPDATE users 
      SET email = $1,
          username = $2,
          first_name = $3,
          last_name = $4,
          last_modified_at = NOW()
      WHERE id = $5
      RETURNING *
    `,
  
    deleteUser: `
      DELETE FROM users 
      WHERE id = $1
    `,
  
    updatePassword: `
      UPDATE users 
      SET password = $1,
          last_modified_at = NOW()
      WHERE id = $2
      RETURNING *
    `,
  };
  
module.exports = userQueries;
  