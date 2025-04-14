const express = require("express");
const { registerUser, login } = require("../controllers/auth.controller");
const { validateUserRegistration, validateUserLogin } = require("../middleware/validation/user.validator");
const responseParser = require("../utils/responseParser");

const router = express.Router();

router.post( "/register", validateUserRegistration, responseParser(registerUser) );
router.post( "/login", validateUserLogin, responseParser(login) );


module.exports = router;