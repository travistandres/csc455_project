const crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../JWTAuth.cjs");
const multer = require("multer");

router.use(authenticateJWT);

// Encryption setup
const algorithm = "aes-256-cbc";
const secretKey = process.env.SECRET_KEY || "3n@4#zC^d8F!q9J4^w@U9tP*lZ$eT0zF";

let db;

const dbPath = path.join(__dirname, "../database.db");

// SQLite DB setup
function openDb() {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Error opening database:", err.message);
  });
}

// Method to upload and encrypt an image
/*function uploadImage(fileName, fileBuffer, callback) {
  try {
    // Encrypt the file buffer
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(Buffer.from(fileBuffer)), cipher.final()]);

    // Store in SQLite
    db.run(
      'INSERT INTO images (name, data) VALUES (?, ?)',
      [fileName, encrypted],
      (err) => {
        if (err) {
          console.error('Error saving image:', err.message);
          callback(false, 'Error saving image');
        } else {
          callback(true, null);
        }
      }
    );
  } catch (error) {
    console.error('Error encrypting image:', error.message);
    callback(false, 'Error encrypting image');
  }
}*/

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  openDb();

  const { fileName } = req.body;
  const imageBuffer = req.file?.buffer;

  try {
    const iv = process.env.IV || crypto.randomBytes(16);

    // Encrypt the file buffer
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encryptedData = Buffer.concat([
      cipher.update(imageBuffer),
      cipher.final(),
    ]);

    const hexIV = iv.toString("hex");

    // Store in SQLite
    db.run(
      "INSERT INTO Images (name, data, owner, iv) VALUES (?, ?, ?, ?)",
      [fileName, encryptedData, req.user.id, hexIV],
      (err) => {
        if (err) {
          db.close();
          return res.status(500).json({ error: err.message });
        } else {
          res.json({ message: "image uploaded", imageID: this.lastID });
        }
      }
    );
  } catch (error) {
    db.close();
    console.error("Error encrypting image:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:imageID", (req, res) => {
  openDb();
  const { imageID } = req.params;
  db.get(
    "DELETE FROM images WHERE id = ? AND owner = ?",
    [imageID, req.user.id],
    function (err) {
      if (err) {
        db.close();
        callback(false, "Error deleting image");
        return res.status(500);
      }
      res.json({ message: "Project deleted", changes: this.changes });
      callback(true, null);
    }
  );
});

router.get("/", (req, res) => {
  openDb();
  const sql = `Select * FROM images WHERE owner = ?`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
    db.close();
  });
});

module.exports = router;
