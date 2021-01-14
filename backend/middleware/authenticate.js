import  * as jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const myToken = authHeader.split(" ")[1];

    jwt.verify(myToken, process.env.TOKEN_SECRET, (err, user) => {
      if (err && err.name === "TokenExpiredError") {
        const message = "Session expired";
        console.log(message);
        res.status(401).send(message);
        return;
      }
      if (err && err.name === "JsonWebTokenError") {
        const message = "Invalid token";
        console.log(message);
        res.status(401).send(message);
        return;
      } else if (err) {
        console.log(err);
        res.status(401).send(err);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export {
  authenticateJWT,
};
