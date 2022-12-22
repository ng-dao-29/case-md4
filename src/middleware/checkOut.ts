// const checkAuth = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         return res.redirect('/admin/login');
//     }
// }
// module.exports = checkAuth;

export class CheckOut {

    static checkOut(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/auth/login');
        }
    }
}