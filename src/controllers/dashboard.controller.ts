import {UserModel} from "../schemas/userModel";

export class Dashboard {

    static async showHome(req,res) {
        const dataUser = await UserModel.findOne({_id: req.user._id})
        res.render('dashboard/home', {user: dataUser})
    }

    static async formUpdate(req, res) {
        const dataUser = await UserModel.findOne({_id: req.user._id})
        console.log(dataUser)
        res.render('dashboard/update', {user: dataUser})
    }

    static async updateUser(req, res) {
        try {
            let dataUser = await UserModel.findOne({_id: req.user._id})
            let avatar = "";
            if (req.file) {
                avatar = req.file.originalname
            } else {
                avatar = dataUser.avatar;
            }
            await UserModel.updateOne({_id: req.user._id},{
                name: req.body.name,
                avatar: avatar,
                address: req.body.address,
                phone: req.body.phone,
                birthday: req.body.birthday,
                email: req.body.email,
                gender: req.body.gender } );
                res.redirect('/admin/dashboard/home')
        } catch (e) {
            console.log(e.message)
            res.redirect('/error/500')
        }
    }

}