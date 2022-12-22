import {UserModel} from "../schemas/userModel";
import bcrypt from 'bcrypt'
 import passport from "../middleware/authPassport"
import jwt from 'jsonwebtoken'


export class Auth {

    static formLogin(req,res) {
        res.render('auth/login');
    }

    // static async loginJWT(req, res) {
    //     console.log('ygy')
    //     console.log(req.body)
    //     try {
    //         const user = await UserModel.findOne({username: req.body.username});
    //         if (user) {
    //             let checkPass = await bcrypt.compare(req.body.password, user.password);
    //             if (!checkPass) {
    //                 // res.redirect('/auth/login');
    //                 res.send('Sai tài khoản hoặc mật khẩu')
    //             }
    //             let payload = {
    //                 user_id: user["id"],
    //                 username: user["username"],
    //                 role: user["role"],
    //             }
    //             const token = jwt.sign(payload, '123654789', {
    //                 expiresIn: 36000,
    //             });
    //             // res.json({token: token, code: 200});
    //             if (user.role === 'admin') {
    //                 res.redirect('/admin/dashboard',{token: token});
    //             }
    //         }
    //     }catch (err) {
    //
    //     }
    // }

    static formRegister(req,res) {
        res.render('auth/createUser');
    }

    static logOut(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/auth/login');
        });
    }

    static async register(req,res) {
        try {
            console.log(req.body)
            if (req.body.password === req.body.confirm_password) {
                const passwordHash = await bcrypt.hash(req.body.password, 10);
                console.log(passwordHash)
                let userNew = await UserModel.findOne({username: req.body.username});
                if (!userNew) {
                    userNew = new UserModel({
                        username: req.body.username,
                        password: passwordHash,
                    })
                    let user = await userNew.save();
                    if (user) {
                        res.redirect('/auth/login')
                    }
                    else {
                        res.send('add error')
                    }
                } else {
                    res.send({err: "tài khảo đã tồn tại"})
                }
            }else {
                res.send('password ko chuùng')
            }
        }catch (err) {
            res.send({err: err.message})
        }
    }

    // static async register(req,res) {
    //     console.log(req.body)
    //     console.log(req.params.id)
    //     console.log(req.fresh.originalname)
    //     try {
    //         let  userNew = await UserModel.findOne({name: req.body.name});
    //         if (!userNew) {
    //             userNew = new UserModel({
    //                 username: req.body.username,
    //                 password: req.body.password,
    //                 name: req.body.name,
    //                 email: req.body.email,
    //                 gender: req.body.gender,
    //                 avatar: req.file.avatar,
    //                 address: req.body.address,
    //                 phone: req.body.quantity,
    //                 dateOfBirth: req.body.dateOfBirth,
    //             });
    //             const user = await userNew.save();
    //             if (user) {
    //                 //thêm chuyển qua list và thêm message success
    //                 res.redirect('/auth/login');
    //             }
    //             else {
    //                 //thêm chuyển qua list và thêm message error
    //                 res.send('create user error')
    //             }
    //         } else {
    //             // thêm chuyển qua list và thêm message măt hàng đã tồn tại
    //             res.send('user already exists')
    //         }
    //     }catch (err) {
    //         //them đưa về view 500
    //         console.log(err.message)
    //         res.send('500')
    //     }
    //
    // }
}