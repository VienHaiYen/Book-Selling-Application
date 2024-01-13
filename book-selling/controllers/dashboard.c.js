const { Dashboard } = require("../models");
const { paginationResponse } = require("../helpers/pagination");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");

async function getOverallReport(req, res, next) {
  try {
    var today_report = await Dashboard.getTodayOverallReport();
    var week_report = await Dashboard.getThisWeekOverallReport();
    var month_report = await Dashboard.getThisMonthOverallReport();
    var year_report = await Dashboard.getThisYearOverallReport();
    return res.json(
      commonSuccessfulResponse({
        today: today_report,
        week: week_report,
        month: month_report,
        year: year_report,
      })
    );
  } catch (err) {
    next(err);
  }
}
async function getDetailReport(req, res, next) {
  try {
    const { reportType } = req.query;
    if (!reportType) {
      return res.status(400).json(commonErrorResponse("Invalid query"));
    } else {
      //TODO switch case for each reportType
      const rs = await Dashboard.getThisWeekDetailReport();
      return res.json(
        commonSuccessfulResponse({
          //   start_date: "start_date",
          //   end_date: "end_date",
          report_type: "weekly",
          detail: rs,
        })
      );
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getOverallReport,
  getDetailReport,
};
