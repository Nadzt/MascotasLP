const express = require("express");
const miscController = require("./controllers/misc")
const router = express.Router();

// Terminos y condiciones
router.get("/terminos", miscController.terminos);

// Politica de privacidad
router.get("/privacidad", miscController.politica);

// Pagina de contacto
router.get("/contacto", miscController.contact);

// Pagina de contacto
router.get("/about", miscController.contact);

// Admin
router.get("/adminview", miscController.admin)

module.exports = router;