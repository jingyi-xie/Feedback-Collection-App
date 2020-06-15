const express = require("express"); // import express (common js modules)
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // get access to cookie
const passport = require("passport"); // tell passport to use cookie
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({ maxAge: 30 * 2400 * 60 * 60 * 1000, keys: [keys.cookieKey] })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); // tell Node to listen on which port
