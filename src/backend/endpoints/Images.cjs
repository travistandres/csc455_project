const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const path = require("path")
const express = require("express");
const router = express.Router();
const authenticateJWT = require('../JWTAuth.cjs');

router.use(authenticateJWT)

// Encryption setup
const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32); // Save securely
const iv = process.env.IV || crypto.randomBytes(16); // Save securely

let db;

// SQLite DB setup
function openDb() {
    db = new sqlite3.Database("../database.db", (err) => {
        if (err) console.error('Error opening database:', err.message);
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

router.post("/", (req, res) => {
    openDb();
    const { fileName, fileBuffer } = req.body
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
              db.close()
              return res.status(500).json({ error: err.message })
            } else {
                res.json({ message: "image uploaded", imageID: this.lastID });
            }
          }
        );
      } catch (error) {
        db.close()
        console.error('Error encrypting image:', error.message);
        return res.status(500).json({ error: error.message })
      }
})

router.delete("/:imageID", (req, res) => {
    openDb()
    const { imageID } = req.params
    db.get('DELETE FROM images WHERE id = ? AND owner = ?', [imageID, req.user.id], function (err) {
        if (err) {
            db.close()
            callback(false, 'Error deleting image');
            return res.status(500)
        }
        res.json({ message: "Project deleted", changes: this.changes })
        callback(true, null)
    })
})

router.get("/", (req, res) => {
    openDb()
    const sql = `Select * FROM images WHERE owner = ?`;
    db.all(sql, [req.user.id], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message });
          }
          res.json(rows);
          db.close();
    })
})

module.exports = router