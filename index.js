const express = require("express"); // import express (common js modules)
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // get access to cookie
const passport = require("passport"); // tell passport to use cookie
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/Survey");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cookieSession({ maxAge: 30 * 2400 * 60 * 60 * 1000, keys: [keys.cookieKey] })
);
app.use(passport.initialize());
app.use(passport.session());

// Case 1: directly recognized by Express server
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Case 2: First check if file
  // Express will serve up production assets like main.js or main.css
  app.use(express.static("client/build"));

  // Case 3: If no file found!
  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT); // tell Node to listen on which port
