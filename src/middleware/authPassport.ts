import passport, {use} from "passport";
import LocalStrategy from "passport-local"
import {UserModel} from "../schemas/userModel";
import bcrypt from 'bcrypt'

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


passport.use('local', new LocalStrategy(
    {passReqToCallback: true},
    async (req, username, password, done) => {
        console.log(username, password);

        if (password === undefined && username === undefined) {
            return done(null, false, req.flash('notPass', ['Need to enter information before logging in', ""]), req.flash('notUser', 'Need to enter information before logging in'))
        }

        const user = await UserModel.findOne({username: username});
        if (!user) {
            return done(null, false, req.flash('notUser', 'Account does not exist'));
        } else {
            let checkPass = await bcrypt.compare(password, user.password)
            if (checkPass) {
                return done(null, user);
            } else {
                return done(null, false, req.flash('notPass', ['incorrect password', `${username}`]));
            }
        }
    }));

export default passport;