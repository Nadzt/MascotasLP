const express = require("express");
const wrapAsync = require("../utilities/wrapAsync")
const generalRoutes = require("./controllers/general")
const router = express.Router();

// Home
router.get("/", generalRoutes.home);

// About
router.get("/about", generalRoutes.about);

module.exports = router;