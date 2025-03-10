const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.all("SELECT * FROM salon_info", [], (err, salonRows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error retrieving salon information");
    } else {
      db.all("SELECT * FROM features", [], (err, featureRows) => {
        if (err) {
          console.error(err.message);
          res.status(500).send("Error retrieving feature ");
        } else {
          db.all("SELECT * FROM services", [], (err, serviceRows) => {
            if (err) {
              console.error(err.message);
              res.status(500).send("Error retrieving service information");
            } else {
              res.render("home", {
                salonInfo: salonRows[0],
                features: featureRows,
                services: serviceRows,
              });
            }
          });
        }
      });
    }
  });
});

// Define routes
router.get("/hair", (req, res) => {
  res.render("hair");
});

// router.get("/nails", (req, res) => {
//   res.render("nails");
// });

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
