const { shopAccessData } = require("../../../lib/users/shopAccessData");

const shopAccessApi = async(req, res) =>{
    const shopinof = req.body;
    const {email,shopId,subEmail} = shopinof.shopAccessInfo;
    console.log(email,shopId,subEmail);
    console.log('shop access',shopinof);
    const result = await shopAccessData(email,shopId,subEmail)
    res.send(result)
}

module.exports = {shopAccessApi}