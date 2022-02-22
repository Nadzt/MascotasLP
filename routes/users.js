const express = require("express");
const wrapAsync = require("../utilities/wrapAsync")
const usersController = require("./controllers/users")
const router = express.Router();
const passport = require("passport");
const isLoggedIn = require("../utilities/isLoggedIn");
const isSameUser = require("../utilities/isSameUser");

// Create
router.get("/registrarse", usersController.createUserForm);
router.post("/registrarse", wrapAsync(usersController.createUserPost));

// Read
router.get("/user/:id", usersController.showUser);
router.get("/user/:id/notificaciones", isLoggedIn, isSameUser, usersController.showNotifications);

// Update
router.get("/user/:id/editar", isLoggedIn, isSameUser, usersController.updateUser);
router.put("/user/:id", isLoggedIn, isSameUser, usersController.updateUserPost);

// Login
router.get("/login", usersController.loginUserForm);
router.post("/login", passport.authenticate("local", { failureFlash: "Nombre de usuario o Contraseñas incorrectos", failureRedirect: "/login" }), usersController.loginUserPost );

// Logout
router.get("/logout", usersController.logoutUser);


module.exports = router;