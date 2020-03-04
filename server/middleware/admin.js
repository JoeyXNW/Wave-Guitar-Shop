let admin = (req, res, next) => {
  if (req.user.role === 0)
    return res.send("Entry denied. Only administrators are allowed");
  next();
};

module.exports = { admin };
