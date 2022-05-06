const { Router } = require("express");
const { registerUser } = require("../controllers/userController");

const router = Router();

router.route("/register").post(registerUser);
module.exports = router;
