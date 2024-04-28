const sessions = [];

const checkAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  const session = sessions.find((x) => x.token === token);

  if (!session) {
    return res.status(401).json({ message: "unauthorized" });
  }

  next();
};

module.exports = {
  sessions,
  checkAuth,
};
