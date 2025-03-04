const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.render("home");
});

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
