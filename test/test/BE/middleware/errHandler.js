const errHandler = (err, req, res, next) => {
  return err.name === "ValidationError"
    ? res.status(400).json(
        Object.keys(err.errors).reduce((obj, key) => {
          obj[key] = err.errors[key].message;
          return obj;
        }, {})
      )
    : err.status
    ? res.status(err.status).json(err.message)
    : res.status(500).send("Error occurred");
};

export default errHandler;
