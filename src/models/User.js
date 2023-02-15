const connection = require('./Connection');

const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [user] = await connection.execute(query, [id]);
    return user;
}

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [user] = await connection.execute(query, [email]);
    return user;
}

const registerUser = async (user) => {
    const { name, email, password } = user;
    const query = 'INSERT INTO users (name, email, password) VALUES(?, ?, ?)';
    const [registeredUser] = await connection.execute(query, [name, email, password]);
    return registeredUser;
};

module.exports = {
    registerUser,
    getUserById,
    getUserByEmail
}