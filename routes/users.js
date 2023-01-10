const express = require("express");
const acceptRequest = require("../controllers/users/accept-request");
const addUser = require("../controllers/users/add-user");
const deleteUser = require("../controllers/users/delete-user");
const getRequests = require("../controllers/users/get-requests");
const getUsers = require("../controllers/users/get-users");
const updateUser = require("../controllers/users/update-user");
const router = express.Router();

router.get("/", [], getUsers);

router.get("/requests", [], getRequests);

router.put("/requests/:id", [], acceptRequest);

router.post("/", [], addUser);

router.delete("/:id", [], deleteUser);

router.put("/:id", [], updateUser);

module.exports = router;
