import passport, {use} from "passport";
import LocalStrategy from "passport-local"
import {UserModel} from "../schemas/userModel";
import bcrypt from 'bcrypt'

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
        return done(null, false);
    } else {
        let checkPass = await bcrypt.compare(password, user.password)
        if (checkPass) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
}));

export default passport;