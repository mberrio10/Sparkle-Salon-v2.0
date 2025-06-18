const express = require("express");
const router = express.Router();
const db = require("../database");
const { fetchReviews } = require("../reviews");

function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

router.get("/", async (req, res) => {
  try {
    const [salonInfo] = await runQuery("SELECT * FROM salon_info LIMIT 1");
    const features = await runQuery("SELECT * FROM features");
    const services = await runQuery("SELECT * FROM services");

    let reviews = [];
    try {
      reviews = await fetchReviews(
        process.env.ACCOUNT_ID,
        process.env.LOCATION_ID
      );
    } catch (reviewError) {
      console.warn("Failed to fetch reviews:", reviewError.message);
      // reviews stays as empty array, app still runs normally
    }
    res.render("home", {
      salonInfo,
      features,
      services,
      reviews,
      subtitle: "Salon",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving salon information");
  }
});

// Define routes
router.get("/hair", async (req, res) => {
  try {
    const [hairDesc] = await runQuery("SELECT * FROM hair_desc LIMIT 1");
    const pricing = await runQuery("SELECT * FROM pricing");

    let reviews = [];
    try {
      reviews = await fetchReviews(
        process.env.ACCOUNT_ID,
        process.env.LOCATION_ID
      );
    } catch (reviewError) {
      console.warn("Failed to fetch reviews for /hair:", reviewError.message);
      // reviews stays as empty array, app still runs normally
    }

    res.render("hair", {
      hairDesc,
      pricing,
      reviews,
      title: "Sparkle",
      subtitle: "Hair",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving hair services information");
  }
});

// router.get("/nails", (req, res) => {
//   res.render("nails");
// });

router.get("/about", async (req, res) => {
  try {
    const locations = await runQuery("SELECT * FROM locations");
    const aboutSchedule = await runQuery("SELECT * FROM about_schedule");

    res.render("about", {
      locations,
      aboutSchedule,
      titleMain: "Sparkle",
      titleSub: "Salon",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving hair services information");
  }
});

module.exports = router;

/* ********** INEFFICIENT CODE ********** */
// router.get("/", (req, res) => {
//   db.all("SELECT * FROM salon_info", [], (err, salonRows) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send("Error retrieving salon information");
//     } else {
//       db.all("SELECT * FROM features", [], (err, featureRows) => {
//         if (err) {
//           console.error(err.message);
//           res.status(500).send("Error retrieving feature ");
//         } else {
//           db.all("SELECT * FROM services", [], (err, serviceRows) => {
//             if (err) {
//               console.error(err.message);
//               res.status(500).send("Error retrieving service information");
//             } else {
//               res.render("home", {
//                 salonInfo: salonRows[0],
//                 features: featureRows,
//                 services: serviceRows,
//                 subtitle: "Salon",
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// });

// router.get("/hair", (req, res) => {
//   db.get("SELECT * FROM hair_desc", [], (err, hairDescRow) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send("Error retrieving hair description");
//     } else {
//       db.all("SELECT * FROM pricing", [], (err, pricingRows) => {
//         if (err) {
//           console.error(err.message);
//           res.status(500).send("Error retrieving pricing data");
//         } else {
//           res.render("hair", {
//             hairDesc: hairDescRow,
//             pricing: pricingRows,
//             title: "Sparkle",
//             subtitle: "Hair",
//           });
//         }
//       });
//     }
//   });
// });
