export const decentralization = async (req, res, next) => {
    let user = req.decoded;
    if (user.role === 'admin') {
        next();
    } else {
        res.send('404')
    }
}