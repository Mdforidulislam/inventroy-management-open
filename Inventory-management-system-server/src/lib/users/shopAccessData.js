const UsersCollection = require("../../models/Users");
const ShopeCollection = require("../../models/shopCollection");


const shopAccessData = async (email, shopId, subEmail) => {
    console.log('Parameters:', email, shopId, subEmail);

    try {
        const checkShopUser = await UsersCollection.findOne({ email: email });
        const shopNameCheck = checkShopUser?.shopeName;

        if (shopNameCheck) {
            const findShop = await ShopeCollection.findOne({ shopeName: shopNameCheck });

            if (findShop && findShop.shopid === shopId) {
                const shopRole = 'sub shop manager';

                const updateShopInfo = await UsersCollection.findOneAndUpdate(
                    { email: email },
                    {
                        $addToSet: {
                            subShopManager: { role: shopRole, email: subEmail }
                        }
                    },
                    { new: true, upsert: true, setDefaultsOnInsert: true }
                );

                if (updateShopInfo) {
                    console.log(updateShopInfo);

                    // Update the subShopManager role in the UsersCollection
                    await UsersCollection.findOneAndUpdate(
                        { email: subEmail },
                        { $set: { role: shopRole } }
                    );

                    return { message: 'You are now a shop sub-admin', updateShopInfo };
                } else {
                    return { message: 'Failed to update shop info' };
                }
            } else {
                return { message: 'Invalid shopId or shop not found' };
            }
        } else {
            return { message: 'Shop name not found for the user' };
        }
    } catch (error) {
        console.error('Error in shopAccessData function:', error);
        return { message: 'An error occurred' };
    }
};


module.exports = {shopAccessData}