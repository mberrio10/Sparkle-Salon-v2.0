const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const pagesRouter = require("./routes/pages"); // import the modularized routes
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://fonts.googleapis.com",
        "https://use.fontawesome.com",
        "'unsafe-inline'",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://use.fontawesome.com",
      ],
      imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com"],
    },
  })
); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(morgan("common")); // Morgan is a HTTP request logger middleware for Node. js.
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.static("public")); // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", pagesRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Sever started on port 3000");
});
