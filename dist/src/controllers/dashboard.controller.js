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
            await userModel_1.UserModel.updateOne({ _id: req.user._id }, {
                name: req.body.name,
                avatar: avatar,
                address: req.body.address,
                phone: req.body.phone,
                birthday: req.body.birthday,
                email: req.body.email,
                gender: req.body.gender
            });
            res.redirect('/admin/dashboard/home');
        }
        catch (e) {
            console.log(e.message);
            res.redirect('/error/500');
        }
    }
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.controller.js.map