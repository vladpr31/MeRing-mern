const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging (customize as needed)

  // Determine the HTTP status code and error message based on the error
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  // Send a JSON response to the client
  res.status(statusCode).json({
    error: errorMessage,
  });
};
module.exports = errorHandler;
