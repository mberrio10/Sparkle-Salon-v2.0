const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const pagesRouter = require("./routes/pages"); // import the modularized routes
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],

      // ✅ Scripts: your CDN + Google Maps
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://maps.googleapis.com",
        "https://maps.gstatic.com",
      ],

      // ✅ Styles: your existing + Google Fonts
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://fonts.googleapis.com",
        "https://use.fontawesome.com",
        "'unsafe-inline'",
      ],

      // ✅ Fonts: your existing + Google Fonts
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://use.fontawesome.com",
      ],

      // ✅ Images: your existing + Google Maps tiles
      imgSrc: [
        "'self'",
        "data:",
        "https://lh3.googleusercontent.com",
        "https://maps.googleapis.com",
        "https://maps.gstatic.com",
        "https://maps.google.com",
      ],

      // ✅ Frames: allow Google Maps iframes
      frameSrc: [
        "'self'",
        "https://www.google.com",
        "https://www.google.com/maps",
      ],
    },
  })
); // Helmet helps you secure your Express apps by setting various HTTP headers.

app.use(morgan("common")); // Morgan is a HTTP request logger middleware for Node. js.

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

app.use(express.static("public")); // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", pagesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
