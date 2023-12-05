const UsersCollection = require("../../models/Users");

const isAdminRollData = async( email) =>{
    try{
        console.log(email,'user roll admin');
        const adminuserInfo = await UsersCollection.findOne({email: email })
        if (adminuserInfo.role === 'admin') {
            console.log('admin true');
            return {massage:'is a admin', isAdmin: true};
        }
        console.log('admin false');
        return {massage:'is not admin', isAdmin: false};
    }catch(error){
        console.log(error);
    }
}





const isShopManagerDat = async (email) => {
    try {
        console.log(email, 'shopaccess user');
        const isShopeManager = await UsersCollection.findOne({ email: email });
        console.log(isShopeManager,'26 cheek');

        if (isShopeManager) {
            if (isShopeManager.role === 'shop manager' || isShopeManager.role === 'sub shop manager') {
                console.log('shop manager true');
                return { message: 'is a shop manager', isShopManager: true };
            } else {
                console.log('shop manager false');
                return { message: 'is not shop manager', isShopManager: false };
            }
        } else {
            console.log('User not found');
            return { message: 'User not found', isShopManager: false };
        }

    } catch (error) {
        console.error('Error in isShopManagerDat function:', error);
        return { message: 'An error occurred', isShopManager: false };
    }
}



module.exports = {isAdminRollData,isShopManagerDat}