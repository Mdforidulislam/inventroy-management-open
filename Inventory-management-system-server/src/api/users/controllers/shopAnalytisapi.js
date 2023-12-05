const { everyShopAnalytis } = require("../../../lib/users/shopAnalytis")


const shopAnalytisApi = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await everyShopAnalytis(email);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


module.exports = {shopAnalytisApi}