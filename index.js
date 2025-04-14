const express = require("express");
require("dotenv").config();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const logger = require("./logger");
const RequestLogger = require("./middleware/requestLogger");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

const corsOptions = {
  origin: process.env.CROSS_ORIGIN_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30
}));
app.use(RequestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`CORS enabled for ${process.env.CROSS_ORIGIN_URL}`);
  });
}