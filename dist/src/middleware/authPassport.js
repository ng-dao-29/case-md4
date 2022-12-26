"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const userModel_1 = require("../schemas/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use('local', new passport_local_1.default({ passReqToCallback: true }, async (req, username, password, done) => {
    console.log(username, password);
    if (password === undefined && username === undefined) {
        return done(null, false, req.flash('notPass', ['Need to enter information before logging in', ""]), req.flash('notUser', 'Need to enter information before logging in'));
    }
    const user = await userModel_1.UserModel.findOne({ username: username });
    if (!user) {
        return done(null, false, req.flash('notUser', 'Account does not exist'));
    }
    else {
        let checkPass = await bcrypt_1.default.compare(password, user.password);
        if (checkPass) {
            return done(null, user);
        }
        else {
            return done(null, false, req.flash('notPass', ['incorrect password', `${username}`]));
        }
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=authPassport.js.map