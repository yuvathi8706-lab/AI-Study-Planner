const StudyPlan = new StudyPlan({
    userId: req.user.userId,
    subject,
    plannedHours,
    deadline
});