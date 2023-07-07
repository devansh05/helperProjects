const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("Not an admin");
});

router.get("/", (req, res) => {
  res.send("Home");
});

router.post("/search/:searchQuery", (req, res) => {
  res.send("Search User");
});

router.post("/", (req, res) => {
  res.send("Admin Profile");
});

router.get("/delete/:id", (req, res) => {
  res.send("Delete Admin");
});

module.exports = router;