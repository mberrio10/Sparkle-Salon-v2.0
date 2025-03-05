const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./hair_salon.db", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to the hair_salon database.");
});

module.exports = db;
