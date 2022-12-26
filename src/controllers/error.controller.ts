export class Error {

    static error500(req,res) {

        res.render('error/500',{
            user: req.user
        })
    }
    static error404(req, res) {

        res.render('error/404',{
            user: req.user
        })
    }
}