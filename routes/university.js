const express = require("express");
const getUniversities = require("../controllers/university/universities");
const getUniversity = require("../controllers/university/university");
const router = express.Router();

router.get("/get/:id", [], getUniversity);

router.get("/all", [], getUniversities);

module.exports = router;
