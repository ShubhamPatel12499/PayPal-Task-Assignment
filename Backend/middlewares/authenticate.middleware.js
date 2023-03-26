const jwt = require("jsonwebtoken")

const middleWareAuth = async (req, res, next) => {
    const accessToken = req.headers["authorization_access"];

    if (!accessToken) {
        return res.send({ message: "Unauthorized users" })
    }

    try {
        let verification = await jwt.verify(accessToken, secure_password);
        if (verification) {
            next();
        }
    } catch (e) {
        return res.send({
            message: "Access Token Expired!",
            desc: e.message
        })
    }
}

module.exports = { middleWareAuth };