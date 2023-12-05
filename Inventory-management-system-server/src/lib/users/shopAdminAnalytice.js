const UsersCollection = require("../../models/Users");
const AdminIncome = require("../../models/adminIncome");
const salesCollection = require("../../models/salesCollection");
const ShopeCollection = require("../../models/shopCollection");

const shopAdminAnalyticeData = async ({ email }) => {
    try {
      console.log(email, 'admin income data');
      const findAdmin = await UsersCollection.findOne({ email: email });
      const findShop = findAdmin.shopeName;
      
      if (findAdmin.role === 'admin') {
        const sumAllIncome = await AdminIncome.aggregate([
            {
              $group: {
                _id: null,
                totalIncome: { $sum: '$usd' },
              },
            },
          ]);
          if (sumAllIncome.length > 0) {
            console.log(sumAllIncome);
            const totalProfit = sumAllIncome[0]?.totalIncome;
            const totalAmount = 0;
            const totalSellingPrice = 0 ;
            console.log(totalProfit);
            return  {massage:"welcome admin ",totalProfit,totalAmount,totalSellingPrice};
          } else {
            console.log('There is no income data.');
            return 0;
          }
      }
      






      const findShopAdminEmail = await UsersCollection.find({
        $or:[
          {email: email},
          {subShopManger:{ $elemMatch:{email:email}}}
        ]
      });

      console.log(findShopAdminEmail,'35 cheek');

      const shopEmail = findShopAdminEmail[0].email;
      const shopName = findShopAdminEmail[0].shopeName  || findShop ; 
      const subShopManager =findShopAdminEmail[0].subShopManger.find(user => user.email === email)
       console.log(subShopManager,shopEmail); 


      if (findAdmin.role === 'shop manager' || subShopManager.role === 'sub shop manager' ) {
        

        // const matchEmail = email || 
        const findShopAndsum = await salesCollection.aggregate([
            {
                $match:{ userEmail: shopEmail}
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
            const {totalProfit,totalAmount,totalSellingPrice} =findShopAndsum[0] || 0 ;
                const shopSearch = await ShopeCollection.findOne({shopeName:shopName})
                console.log(shopSearch ,'shop id search');
                const shopId = shopSearch.shopid || 'no id available';
                console.log('Total Profit:', totalProfit.toFixed());
                console.log('Total Amount:', totalAmount.toFixed());
                console.log('Total Selling Price:', totalSellingPrice.toFixed());
                return {massage:'welcome ShopManager',totalProfit,totalAmount,totalSellingPrice,shopId}
           }else{
            console.log('No data found for the given email.');
            const totalAmount = 0;
            const totalSellingPrice = 0 ;
            const totalProfit = 0 ;
            return {totalProfit,totalAmount,totalSellingPrice}
           }
      }
      
    
    } catch (error) {
      console.error(error.message);
    //   throw new Error('An error occurred while fetching income data');
    }
  };
  

module.exports = shopAdminAnalyticeData