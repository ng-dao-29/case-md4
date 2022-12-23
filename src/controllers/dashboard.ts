export class Dashboard {

    static showHome(req,res) {
        res.render('dashboard/home')
    }

    static formUpdate(req, res) {
        res.render('dashboard/update')
    }

}