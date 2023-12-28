const commonSuccessfulResponse = (
  data,
  status = "success",
  message = "Operation completed successfully"
) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};
module.exports = {
  commonSuccessfulResponse,
};
