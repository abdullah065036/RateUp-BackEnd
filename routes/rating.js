const express = require("express");
const addLike = require("../controllers/like/add-like");
const addUnLike = require("../controllers/like/add-unlike");
const deleteLike = require("../controllers/like/delete-like");
const deleteUnLike = require("../controllers/like/delete-unlike");
const addRating = require("../controllers/rating/add-rating");
const clearReport = require("../controllers/rating/clear-report");
const deleteRating = require("../controllers/rating/delete-rating");
const getRatings = require("../controllers/rating/get-rating");
const reportRating = require("../controllers/rating/report-rating");
const getUserRatings = require("../controllers/rating/user-rating");
const addReply = require("../controllers/reply/add-reply");
const getReplies = require("../controllers/reply/get-reply");
const router = express.Router();

router.post("/", [], addRating);

router.get("/:id", [], getRatings);

router.delete("/rating/:id", [], deleteRating);

router.post("/reply", [], addReply);

router.get("/reply/:id", [], getReplies);

router.post("/like", [], addLike);

router.put("/report/:id", [], reportRating);

router.put("/clear/:id", [], clearReport);

router.post("/unlike", [], addUnLike);

router.delete("/like", [], deleteLike);

router.delete("/unlike", [], deleteUnLike);

router.get("/user-rating/:id", [], getUserRatings);

module.exports = router;
