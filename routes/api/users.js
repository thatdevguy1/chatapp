const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");

router.post("/signup", usersCtrl.create);
router.post("/login", usersCtrl.login);

module.exports = router;

/*

/api/users/signup
/api/users/login

{username: "", password: ""}

*/
