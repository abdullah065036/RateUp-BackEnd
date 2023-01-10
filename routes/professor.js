const express = require("express");
const changeUniversity = require("../controllers/professor/change-university");
const getProfessor = require("../controllers/professor/professor");
const getProfessors = require("../controllers/professor/professors");
const getUniversityProfessors = require("../controllers/professor/university-professors");
const getReportedRatings = require("../controllers/rating/get-reported");
const router = express.Router();

router.get("/get/:id", [], getProfessor);

router.put("/change/:id", [], changeUniversity);

router.get("/all", [], getProfessors);

router.get("/university/:id", [], getUniversityProfessors);

router.get("/report", getReportedRatings);

module.exports = router;
