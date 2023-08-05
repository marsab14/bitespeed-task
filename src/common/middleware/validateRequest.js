function validateRequest(schema, type) {
  return async (req, res, next) => {
    let valid = null;
    try {
      if (type === "body") {
        valid = await schema.validateAsync(req.body);
      } else if (type === "query") {
        valid = await schema.validateAsync(req.query);
      } else {
        valid = await schema.validateAsync(req.body);
      }
    } catch (error) {
      return res
        .status(404)
        .json({ name: "VALIDATION_ERROR", stack: error.details[0].message });
    }
    next();
  };
}

module.exports = validateRequest;
