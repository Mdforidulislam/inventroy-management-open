const createToken = require("../../../lib/users/createToken");

const createAuthCookie = async (req, res, next) => {
    try {
        const email = req.body;
        const token = await createToken(email);
        res.send({ msg: 'success', token });
    } catch (error) {
        console.error('Error creating auth cookie:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = createAuthCookie