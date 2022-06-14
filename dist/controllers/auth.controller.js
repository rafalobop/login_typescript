"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = new User_1.default({
        username,
        email,
        password
    });
    user.password = yield user.encryptPass(user.password);
    console.log('userrr', user);
    const savedUser = yield user.save();
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.SECRETKEY || 'TokEnTes7');
    res.header('auth-token', token).json({
        msg: 'usuario creado exitosamente',
        user: savedUser,
        code: 2,
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({
            msg: 'Usuario o contraseña incorrectos',
            code: 1
        });
    }
    const validaLogin = yield user.validatePass(password);
    if (!validaLogin) {
        return res.status(400).json({
            msg: 'Usuario o contraseña incorrectos',
            code: 1
        });
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRETKEY || 'TokEnTes7');
    return res.header('auth-token', token).status(200).json({
        msg: `Bienvenido, ${user.username}`,
        code: 2
    });
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const user = yield User_1.default.findById(userId, { password: 0 });
    if (!user)
        return res.status(400).json({
            msg: 'No se encontro el usuario',
            code: 1
        });
    return res.status(200).json({
        msg: 'Usuario encontrado',
        user,
        code: 2
    });
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map