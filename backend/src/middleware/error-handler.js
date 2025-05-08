import logger from "#utils/logger.util";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;

  logger.error({
    message,
    statusCode,
    stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    user: req.user,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(stack && { stack }),
    },
  });
};

export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
