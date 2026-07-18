const StudyPlan = require("../models/StudyPlan");

const createPlan = async(req,res)=>{

    try{
        const {
            subject,
            plannedHours,
            deadline
        } = req.body;

        if(!subject || !plannedHours ||!deadline){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const plan = new StudyPlan({
            userId:req.user.userId,
            subject,
            plannedHours,
            deadline
        });

        await plan.save();

        return res.status(201).json({
            message:"Study plan created",
            plan
        });
    }
    catch(error){
        return res.status(500).json({
            message:"Server Error"
        });
    }
};

const getPlans = async(req, res) => {
    try{
        const plans = await StudyPlan.find({
            userId: req.user.userId
        });
        return res.status(200).json(plans);
    }
    catch(err){
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

const updatePlan = async(req, res) => {
    try{
        const plan = await StudyPlan.findById(req.params.id);
        if(!plan){
            return res.status(404).json({
                message: "Study plan not found"
            });
        }

        if(plan.userId.toString() !== req.user.userId){
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        plan.subject = req.body.subject || plan.subject;
        plan.plannedHours = req.body.plannedHours || plan.plannedHours;
        plan.deadline = req.body.deadline || plan.deadline;
        plan.status = req.body.status || plan.status;

        await plan.save();

        return res.status(200).json({
            message: "Study plan updated",
            plan
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const deletePlan = async(req, res) => {
    try{
        const plan = await StudyPlan.findById(req.params.id);
        if(!plan){
            return res.status(404).json({
                message: " Study plan not found"
            });
        }

        if(plan.userId.toString() != req.user.userId){
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        await plan.deleteOne();
        return res.status(200).json({
            message: "Study plan succesfully deleted"
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {createPlan, getPlans, updatePlan, deletePlan};