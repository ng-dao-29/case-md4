"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const userModel_1 = require("../schemas/userModel");
class Dashboard {
    static async showHome(req, res) {
        const dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
        res.render('dashboard/home', { user: dataUser });
    }
    static async formUpdate(req, res) {
        const dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
        console.log(dataUser);
        res.render('dashboard/update', { user: dataUser });
    }
    static async updateUser(req, res) {
        try {
            let dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
            let avatar = "";
            if (req.file) {
                avatar = req.file.originalname;
            }
            else {
                avatar = dataUser.avatar;
            }
            let user = await userModel_1.UserModel.findOne({ _id: req.user._id });
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
            res.redirect('/admin/dashboard/home');
        }
        catch (e) {
            console.log(e.message);
        }
    }
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.js.map