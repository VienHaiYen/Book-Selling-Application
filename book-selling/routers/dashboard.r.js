const router = require("express").Router();
const { dashboardController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");

//TODO validate authz only allow admin role

router.get("/overall", dashboardController.getOverallReport);
router.get("/detail", dashboardController.getDetailReport);
module.exports = router;
