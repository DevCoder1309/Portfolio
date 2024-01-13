if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const route = require("./routes/route");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const AppError = require("./utils/ExpressError");

const dbUrl = process.env.DB_URL;

const secretConfig = {
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(secretConfig));

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((err) => {
    console.log("OH NO! ERROR", err);
  });

app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", route);

app.all("*", (req, res, next) => {
  next(new AppError("PAGE NOT FOUND", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "sorry something went wrong" } = err;
  const name = "Error";
  res.status(status).render("error.ejs", { name, message });
});

app.listen(3000, () => {
  console.log("Listening on port number 3000............");
});
