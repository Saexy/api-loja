require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const validateRegister = async (req, res, next) => {
    if(req.body.name === undefined || req.body.name === ""){
        return res.status(404).json({ message: "O campo 'name' precisa ser obrigatório." })
    }
    if(req.body.email === undefined || req.body.email === ""){
        return res.status(404).json({ message: "O campo 'email' precisa ser obrigatório." })
    }
    if(req.body.password === undefined || req.body.password === ""){
        return res.status(404).json({ message: "O campo 'password' precisa ser obrigatório." })
    }

    const [userCheck] = await User.getUserByEmail(req.body.email);

    if(userCheck){
        return res.status(404).json({ message: "Já existe uma conta com este email." });
    }

    next();
};

const validateLogin = async (req, res, next) => {
    if(req.body.email === undefined || req.body.email === ""){
        return res.status(404).json({ message: "O campo 'email' precisa ser obrigatório." })
    }
    if(req.body.password === undefined || req.body.password === ""){
        return res.status(404).json({ message: "O campo 'password' precisa ser obrigatório." })
    }

    const [userCheck] = await User.getUserByEmail(req.body.email);

    if(!userCheck){
        return res.status(404).json({ message: "Não existe um usuário com este email." });
    }
    const comparePassword = await bcrypt.compare(req.body.password, userCheck.password);
    if(!comparePassword){
        return res.status(404).json({ message: "Senha incorreta!" });
    }

    next();
};

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if(authorization == undefined || authorization == ""){
        return res.status(401).json({ message: "Acesso negado!" });
    }

    const token = authorization.split(' ')[1];

    try {
        jwt.verify(token, SECRET);
    }catch(err) {
        return res.status(401).json({ message: "Acesso negado!" });
    }

    next();
}

module.exports = {
    validateRegister,
    validateLogin,
    validateToken,
};