// external imoprts
const router = require("express").Router();

// internal imports
const authRoutes = require("./authRoutes");

// implement routes
router.use("/api/v1/auth", authRoutes);

module.exports = router;
