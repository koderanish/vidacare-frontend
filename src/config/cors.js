const env = require("./env");

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser tools (curl, Postman, server-to-server) with no Origin header.
    if (!origin || env.corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin ${origin} is not allowed`));
  },
  credentials: true,
};

module.exports = corsOptions;
