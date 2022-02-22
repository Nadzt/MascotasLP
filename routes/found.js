const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync");
const foundController = require("./controllers/found");
//Middleware
const isLoggedIn = require("../utilities/isLoggedIn");
const validateFound = require("../utilities/validateFound")
const validateUpdateFound = require("../utilities/validateUpdateFound")
const isAuthor = require("../utilities/isAuthorFound");
const { storageFound } = require("../utilities/cloudinary")
const multer  = require('multer');
const upload = multer({ storage: storageFound });

//Coleccion de Mascotas --- /mascotas
router.get("/", wrapAsync(foundController.index))
router.post("/", wrapAsync(foundController.indexFilter))

// Create 
router.get("/nueva", isLoggedIn, foundController.createForm)
router.post("/nueva", isLoggedIn, upload.array("images"), validateFound, wrapAsync(foundController.createPost))

// Read
router.get("/:id", wrapAsync(foundController.showFound))

// Update
router.get("/:id/editar", isLoggedIn, isAuthor, wrapAsync(foundController.updateForm))
router.put("/:id", isLoggedIn, isAuthor, upload.array("images"), validateUpdateFound, wrapAsync(foundController.updatePost)) 

// Delete
router.delete("/:id", isLoggedIn, isAuthor, wrapAsync(foundController.deleteFound))

module.exports = router;