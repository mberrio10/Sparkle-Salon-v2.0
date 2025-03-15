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
                subtitle: "Salon",
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
  db.get("SELECT * FROM hair_desc", [], (err, hairDescRow) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error retrieving hair description");
    } else {
      db.all("SELECT * FROM pricing", [], (err, pricingRows) => {
        if (err) {
          console.error(err.message);
          res.status(500).send("Error retrieving pricing data");
        } else {
          res.render("hair", {
            hairDesc: hairDescRow,
            pricing: pricingRows,
            title: "Sparkle",
            subtitle: "Hair",
          });
        }
      });
    }
  });
});

// router.get("/nails", (req, res) => {
//   res.render("nails");
// });

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
