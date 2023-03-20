import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        let accessToken = req.body["access_token"];
        if (accessToken) {
            jwt.verify(accessToken, "123654789", (err, decoded) => {
                    if (err) {
                        res.send('401').status(401)
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                },
            );
        } else {
                res.send('No token provided').status(404)
        }
    } catch (err) {
        return res.send('401 err').status(401);
    }
}