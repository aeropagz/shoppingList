let checkRoleFarmer = function (req, res, next) {
  if (req.user.role === "farmer") {
    next();
  } else {
    res.sendStatus(401);
  }
};
let checkRoleCust = function (req, res, next) {
  if (req.user.role === "customer") {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  checkRoleFarmer,
  checkRoleCust,
};
