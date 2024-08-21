const checkAuthenticatedUser = (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    next();
  } else {
    res.status(400).json("Not authenticated");
  }
};

export default checkAuthenticatedUser;
