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
    let overallRating = null;
    let totalReviews = 0;

    try {
      allReviews = await fetchReviews(
        process.env.ACCOUNT_ID,
        process.env.LOCATION_ID
      );

      // Filter out reviews with empty comments
      // This ensures we only keep reviews that have a non-empty comment
      const validReviews = allReviews.filter(
        (r) => r.comment && r.comment.trim() !== ""
      );

      // Randomly select 3 reviews from the fetched reviews
      reviews = validReviews.sort(() => Math.random() - 0.5).slice(0, 3);

      // Extract star ratings from the reviews
      // Assuming starRating is a string like "5_STAR", we can parse it to get the numeric value
      const ratings = validReviews.map((r) =>
        parseFloat(r.starRating.replace("_STAR", ""))
      );
      // Calculate the average rating
      if (ratings.length > 0) {
        const avgRating =
          ratings.reduce((sum, val) => sum + val, 0) / ratings.length;
        overallRating = avgRating.toFixed(1); // Round to 1 decimal place
        totalReviews = ratings.length; // Total number of reviews
      }
    } catch (reviewError) {
      // reviews stays as empty array, app still runs normally
      console.warn("Failed to fetch reviews for /hair:", reviewError.message);
    }

    res.render("hair", {
      hairDesc,
      pricing,
      reviews,
      overallRating,
      totalReviews,
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
