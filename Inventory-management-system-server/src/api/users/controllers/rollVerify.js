const { isAdminRollData, isShopManagerDat } = require("../../../lib/users/userRoolCheek");

const isAdminApi = async(req,res) =>{
    const email = req.params.email;
    console.log('admin api ',email);
    const result = await isAdminRollData(email)
    res.send(result)
}


const isShopAdminApi = async(req, res) =>{
    const email = req.params.email;
    const result = await isShopManagerDat(email)
    res.send(result)
}

module.exports = {isShopAdminApi , isAdminApi}