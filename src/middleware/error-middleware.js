import { ResponseError } from "../error/response-error.js";

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.statusCode).json({
      errors: err.message,
    });
  } else if (err.status) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};

export default errorMiddleware;
