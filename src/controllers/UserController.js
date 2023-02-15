const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const registeredUser = await User.registerUser({name, email, password: passwordHash});
    
    res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
};

const loginUser = async (req, res) => {
    const [userLogin] = await User.getUserByEmail(req.body.email); 
    const token = jwt.sign({
        id: userLogin.id,
        email: userLogin.email
    }, SECRET);

    res.status(200).json({ token: token })
};

module.exports = {
    registerUser,
    loginUser,
};