// external imoprts
const router = require("express").Router();

// internal imports
const authRoutes = require("./authRoutes");
const coffeeRoutes = require("./coffeeRoutes");

// implement routes
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/admin/coffee", coffeeRoutes);

module.exports = router;
