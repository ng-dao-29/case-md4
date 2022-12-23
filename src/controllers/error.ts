export class Error {

    static error500(req,res) {
        res.render('error/500')
    }
    static error404(req, res) {
        res.render('error/404')
    }
}