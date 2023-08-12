import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
const express = require("express");
const app = express();
const otpRoutes = require("./routes/otpRoutes");
const facebookRouter = require("./controllers/facebook-auth");
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get("/", (req, res) => {
  res.render("auth");
});

/* ROUTES */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.post("/auth/register", register);
app.use("/otp", otpRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
