const express = require("express");
const { authorizeBearerToken } = require("../middlewares/jsonwebtoken");
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const loginWithToken = require("../controllers/auth/login-with-token");
const sendCode = require("../controllers/auth/send-code");
const verifyCode = require("../controllers/auth/verify-code");
const Domain = require("../models/Domain");
const getDomains = require("../controllers/auth/get-domains");
const changePassword = require("../controllers/auth/change-password");
const forgetPassword = require("../controllers/auth/forget-password");

const router = express.Router();

router.post("/register", [], register);

router.post("/send-code", [], sendCode);

router.post("/forget-password", [], forgetPassword);

router.post("/change-password", [], changePassword);

router.post("/verify-code", [], verifyCode);

router.post("/login", [], login);

router.get("/domains", [], getDomains);

router.get("/account", [authorizeBearerToken], loginWithToken);

module.exports = router;
