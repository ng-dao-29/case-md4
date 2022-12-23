export const decentralization = async (req, res, next) => {
    let user = req.decoded;
    if (user.role === 'product') {
        next();
    } else {
        res.send('404')
    }
}