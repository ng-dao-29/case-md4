export const decentralization = async (req, res, next) => {
    let user = req.user;
    if (user.role === 'admin') {
        next();
    } else {
        res.redirect('/error/404')
    }
}