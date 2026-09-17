// Wraps an async controller so rejected promises reach errorHandler without
// a try/catch in every controller function.
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = asyncHandler;
