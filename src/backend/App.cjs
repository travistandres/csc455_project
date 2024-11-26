const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Middleware to parse JSON
app.use(express.json());

app.use(cors());
const dbPath = path.join(__dirname, "./database.db");

// Import routes
const imagesRouter = require("./endpoints/Images.cjs");

// Use routes
app.use("/images", imagesRouter);

function openDb() {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening database " + err.message);
    } else {
      console.log("Connected to the testJam.db SQLite database.");
    }
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Function to return hash from original input password during signup to store in database
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hashedPassword = bcrypt.hash(password, 10);
      const errorOccurred = false;

      if (errorOccurred) {
        reject(new Error("IDK HOW THE HELL FALSE IS TRUE"));
      } else {
        resolve(hashedPassword);
      }
    }, 20);
  });
}

//Function to compare input password to stored hash to verify credentials for login
async function matchPassword(inputPassword, storedPassword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const passwordMatch = bcrypt.compare(inputPassword, storedPassword);
      const errorOccurred = false;

      if (errorOccurred) {
        reject(new Error("IDK HOW THE HELL FALSE IS TRUE"));
      } else {
        resolve(passwordMatch);
      }
    }, 20);
  });
}

// Create User
app.post("/users", (req, res) => {
  openDb();
  const { name, password } = req.body;

  // Hash the password
  hashPassword(password).then((hashedPassword) => {
    const sql = `INSERT INTO Users (name, password) VALUES (?, ?)`;
    db.run(sql, [name, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User created", userID: this.lastID });
    });
    db.close();
  });
});

//Defining Secret Key for signing purposes
const SECRET_KEY = process.env.JWT_SECRET || "3n@4#zC^d8F!q9J4^w@U9tP*lZ$eT0z";

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  openDb();
  // Retrieve the user from the database
  db.get(`SELECT * FROM Users WHERE name = ?`, [name], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error." });
    }
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Compare the hashed password
    matchPassword(password, user.password).then((isPasswordValid) => {
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials." });
      } else {
        // Generate a JWT token
        const token = jwt.sign(
          { id: user.id, username: user.name },
          SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        res.json({ message: "Login successful!", token });
      }
    });
  });
  db.close();
});
