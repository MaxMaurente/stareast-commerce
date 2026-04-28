const express = require("express");
const authController = require("../controllers/authController");
const checkoutController = require("../controllers/checkoutController");
const healthController = require("../controllers/healthController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/checkout", authMiddleware, checkoutController.checkout);
router.get("/healthcheck", healthController.healthcheck);

module.exports = router;
