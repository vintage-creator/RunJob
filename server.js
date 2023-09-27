require("dotenv").config();
require("ejs");
const express = require("express");
const app = express();
const cors = require("cors");
const { join } = require('path');
const flash = require('express-flash');
const runRoute = require("./Routes/runApp");
const authRoute = require("./Routes/auth");
const session = require('express-session');
const passport = require('passport');
const mongoose = require("mongoose");
const runJoDb = require("./Config/database");


runJoDb();

// Set the view engine to EJS
app.set("view engine", "ejs");
//Middlewares
app.use(session({ 
    secret: process.env.Secret_ID, 
    resave: true, 
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      secure: false, // Set to true if your app is running over HTTPS
  }, 
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use("/", express.static(join(__dirname, "views")));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use("/runjob", runRoute);

const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;
  

app.get("/", (req, res) => {
    res.render("signin", { flashMessages: req.flash() });
});

app.get("/signup(.html)?", (req, res) => {
  res.render('signup', { flashMessages: req.flash() });
});

// Catch-all handler should be the last route
app.all("*", (req, res) => {
    res.render("404");
});

mongoose.connection.once("open", async () => {
    const chalk = (await import("chalk")).default;
    console.log(chalk.blue("Connected to Database."));
    app.listen(port, async (err) => {
      if (err) {
        throw new Error("Error connecting to the server");
      }
      console.log(chalk.bgRed(`Server is running on http://localhost:${port}`));
    });
  });
  
  mongoose.connection.on("error", async (err) => {
    const chalk = (await import("chalk")).default; // Import chalk dynamically
    console.error(chalk.red("MongoDB connection error:", err));
    process.exit(1);
  });
  
