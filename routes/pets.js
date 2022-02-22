const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync");
const petsController = require("./controllers/pets");
//Middleware
const isLoggedIn = require("../utilities/isLoggedIn");
const validatePet = require("../utilities/validatePet");
const validateUpdatePet = require("../utilities/validateUpdatePet");
const isAuthor = require("../utilities/isAuthor");
const { storage } = require("../utilities/cloudinary");
const multer  = require('multer');
const upload = multer({ storage });

//Coleccion de Mascotas --- /mascotas
router.get("/", wrapAsync(petsController.index))
router.post("/", wrapAsync(petsController.indexFilter))

// Create 
router.get("/nueva", isLoggedIn, petsController.createForm)
router.post("/nueva", isLoggedIn, upload.array("images"), validatePet, wrapAsync(petsController.createPost))

// Read
router.get("/:id", wrapAsync(petsController.showPet))

// Update
router.get("/:id/editar", isLoggedIn, isAuthor, wrapAsync(petsController.updateForm))
router.put("/:id", isLoggedIn, isAuthor, upload.array("images"), validateUpdatePet, wrapAsync(petsController.updatePost)) 

// Delete
router.delete("/:id", isLoggedIn, isAuthor, wrapAsync(petsController.deletePet))

module.exports = router;