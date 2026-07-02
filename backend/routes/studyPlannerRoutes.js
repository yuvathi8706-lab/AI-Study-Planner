const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {createPlan} = require("../controllers/studyPlanController")

router.post("/plans", auth, createPlan);
router.put("/plans/:id", auth, updatePlan);

module.exports = router;