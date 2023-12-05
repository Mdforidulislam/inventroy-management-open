const salesCollection = require("../../models/salesCollection");
const ShopeCollection = require("../../models/shopCollection");

const everyShopAnalytis = async (email) =>{
      try{ 
           console.log(email);
           const findShopAndsum = await salesCollection.aggregate([
            {
                $match:{ userEmail: email}
            },
            {
                $group:{
                    _id: null,
                    totalProfit: {$sum: '$profit'},
                    totalAmount: {$sum: '$amount'},
                    totalSellingPrice: {$sum:'$seling'}
                }
            }
           ]);
           console.log(findShopAndsum);
           if (findShopAndsum && findShopAndsum.length > 0) {
            const {totalProfit,totalAmount,totalSellingPrice} =findShopAndsum[0];
                console.log('Total Profit:', totalProfit);
                console.log('Total Amount:', totalAmount);
                console.log('Total Selling Price:', totalSellingPrice);
                return {totalProfit,totalAmount,totalSellingPrice}
           }else{
            console.log('No data found for the given email.');
           }
      }catch(error){
        console.log(error);
      }
}

module.exports = {everyShopAnalytis}