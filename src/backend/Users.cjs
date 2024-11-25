const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("./src/backend/database.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Database opened successfully");
  }
});

db.run("PRAGMA foreign_keys = ON;");

export const create = (user, password) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password", err);
      return;
    }

    // Insert the user with the hashed password
    const stmtUser = db.prepare(
      "INSERT INTO users (name, password) VALUES (?, ?)"
    );
    stmtUser.run(user, hashedPassword, (err) => {
      if (err) {
        console.error("Error inserting user", err);
      } else {
        console.log("User inserted successfully");
      }
    });
    stmtUser.finalize();
  });
};
