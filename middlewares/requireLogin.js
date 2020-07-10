module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  // If signed in, to the actual req handler
  next();
};
