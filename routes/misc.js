const express = require("express");
const miscController = require("./controllers/misc")
const router = express.Router();

// Terminos y condiciones
router.get("/terminos", miscController.terminos);

// Politica de privacidad
router.get("/privacidad", miscController.politica);

module.exports = router;