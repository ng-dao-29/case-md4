import {UserModel} from "../schemas/userModel";
import bcrypt from 'bcrypt'
 import passport from "../middleware/authPassport"



export class Auth {

    static formLogin(req,res) {
        let notPass = req.flash('notPass');
        let notUser = req.flash('notUser');
        res.render('auth/login',{ notPass : notPass, notUser: notUser  });
    };

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
    //             if (user.role === 'product') {
    //                 res.redirect('/product/dashboard',{token: token});
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
                let userNew = await UserModel.findOne({username: req.body.username});
                if (!userNew) {
                    userNew = new UserModel({
                        username: req.body.username,
                        password: passwordHash,
                        avatar: 'avatar-default.jpg',
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
                res.redirect('/auth/register')
            }
        }catch (err) {
           res.redirect('/error/500')
        }
    }

}