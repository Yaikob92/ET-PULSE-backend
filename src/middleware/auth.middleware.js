export const protectRoute = async (req, res, next) => {
  if (!req.auth().isAuthorizes) {
    return res
      .status(400)
      .json({ message: "Unauthorized - you must be log in" });
  }
  next();
};
