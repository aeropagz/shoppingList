let jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const myToken = authHeader.split(' ')[1];

        jwt.verify(myToken, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateJWT
};