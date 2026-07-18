const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    createPlan,
    getPlans,
    updatePlan,
    deletePlan
} = require("../controllers/studyPlanController");

router.post("/plans", auth, createPlan);
router.get("/plans", auth, getPlans);
router.put("/plans/:id", auth, updatePlan);
router.delete("/plans/:id", auth, deletePlan);

module.exports = router;