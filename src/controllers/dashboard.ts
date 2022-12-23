import {UserModel} from "../schemas/userModel";

export class Dashboard {

    static showHome(req,res) {
        res.render('dashboard/home')
    }

    static formUpdate(req, res) {
        const dataUser = req.user
        console.log(dataUser)
        res.render('dashboard/update', {user: dataUser})
    }

    static async updateUser(req, res) {
        try {
            const dataUser = req.user
            let avatar = "";
            if (req.file) {
                avatar = req.file.originalname
            }else  {
                avatar = dataUser.avatar;
            }

            let user = await UserModel.findOne({_id: req.user._id});
            console.log(user);
                user.name = req.body.name;
                user.avatar = avatar;
                user.address = req.body.address;
                user.phone = req.body.phone;
                user.birthday = req.body.birthday;
                user.email = req.body.email;
                user.gender = req.body.gender;
                await user.save();
                if (user) {

                }
                res.redirect('/admin/dashboard/home')
        }catch (e) {;
            console.log(e.message)
        }

    }






}