const commonErrorResponse = (
  msg = "Bad Request",
  detail = null,
  payload = null,
  status = "error"
) => {
  return {
    status: status,
    message: msg,
    detail: detail,
    payload: payload,
  };
};
module.exports = {
  commonErrorResponse,
};
