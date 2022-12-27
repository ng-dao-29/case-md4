"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const userModel_1 = require("../schemas/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Auth {
    static formLogin(req, res) {
        let notPass = req.flash('notPass');
        let notUser = req.flash('notUser');
        res.render('auth/login', { notPass: notPass, notUser: notUser });
    }
    ;
    static formRegister(req, res) {
        let message = req.flash("message");
        console.log(message);
        res.render('auth/createUser', { messages: message });
    }
    static logOut(req, res, next) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/auth/login');
        });
    }
    static async register(req, res) {
        try {
            console.log(req.body);
            if (req.body.password === req.body.confirm_password) {
                const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
                let userNew = await userModel_1.UserModel.findOne({ username: req.body.username });
                if (!userNew) {
                    userNew = new userModel_1.UserModel({
                        username: req.body.username,
                        password: passwordHash,
                        avatar: 'avatar-default.jpg',
                    });
                    await userNew.save();
                    res.redirect('/auth/login');
                }
                else {
                    req.flash("message", "Account already exists");
                    res.redirect('/auth/register');
                }
            }
            else {
                req.flash("message", "password authentication is not correct");
                res.redirect('/auth/register');
            }
        }
        catch (err) {
            res.redirect('/error/500');
        }
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.controller.js.map