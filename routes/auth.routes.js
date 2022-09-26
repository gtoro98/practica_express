const path = require("path")
const express = require("express")
const controller = require("../controllers/auth.controllers");
const { checkDuplicateEmails } = require("../middleware/verifySignIn");
const { checkToken } = require("../middleware/authJwt");

const router = express.Router();


router.get('/LogIn', controller.logIn)
router.post('/SignIn', [checkDuplicateEmails], controller.signIn)
router.get('/Info', [checkToken], controller.info)
//router.post('/Logout', controler.Logout)


module.exports = router