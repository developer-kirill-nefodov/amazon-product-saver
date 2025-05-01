import multer from 'multer';

const upload = multer();

export const parseFormData = upload.none();

export const processFormData = (req, res, next) => {
  try {
    if (!req.is('multipart/form-data')) {
      return next();
    }

    const formData = new URLSearchParams(req.body);
    const data = formData.get('data');
    const image = formData.get('image');
    if (!data) {
      return res.status(400).json({
        message: 'Missing required data field'
      });
    }

    req.body = {
      data: JSON.parse(data),
      image: image || null
    };

    next();
  } catch (error) {
    console.error('FormData processing error:', error);
    res.status(400).json({
      message: 'Invalid FormData format',
      error: error.message
    });
  }
}; 