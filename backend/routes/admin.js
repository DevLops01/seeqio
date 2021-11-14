const express = require("express");
const router = new express.Router();
const { createSkill, createCategory } = require("../controllers/admin");
// const auth = require("../middleware/auth");

router.post("/create/skill", createSkill);

router.post("/create/category", createCategory);

module.exports = router;
