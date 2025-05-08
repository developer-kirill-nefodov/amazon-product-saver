import multer from "multer";

const upload = multer();

export const parseFormData = upload.none();

export const processFormData = (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        message: "Missing required data field",
      });
    }

    req.product = {
      ...JSON.parse(data),
    };

    next();
  } catch (error) {
    console.error("FormData processing error:", error);
    res.status(400).json({
      message: "Invalid FormData format",
      error: error.message,
    });
  }
};
