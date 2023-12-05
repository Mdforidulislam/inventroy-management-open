const { parse } = require("date-fns");
const UsersCollection = require("../../models/Users");
const AdminIncome = require("../../models/adminIncome");
const Coupon = require("../../models/discountCoupon");
const productCollection = require("../../models/productCollection");
const ShopeCollection = require("../../models/shopCollection");
const salesCollection = require("../../models/salesCollection");


const inserUserDAta = async (usersInfo) => {
         try{
            const user = new UsersCollection(usersInfo);
            const result = await user.save()
            console.log('user data save succesfully', result);
            return result;
         } catch(error) {
            console.error('error saving user data ' )
            throw error;
         }
}


const shopeInsertData = async (shopeData) => {
   console.log(shopeData);
 
   try { 

      const exiteShope = await ShopeCollection.findOne({shopeName: shopeData.shopeName , ownerEmail: shopeData.ownerEmail})
      
      if (exiteShope) {
         console.log('shope allready exite ');
         return {successMassage: ' shope allready exite'}
      }else{

         const hash = crypto.createHash('sha256');
         hash.update(shopeData.shopeName);
         const hashedValue = hash.digest('hex');
         const shopid = hashedValue.slice(0, 15);
         
         const updateData = { ...shopeData, shopid };

         const newShope = new ShopeCollection(updateData);
         const result = await newShope.save();
     
         console.log('Shope data successfully added', result);
         return result;
      }
   } catch (error) {
     console.error('Error inserting shope data:', error);
     // You might want to throw the error here or handle it appropriately.
   }
 };

 const userUpdateInfo = async (userUpdateInfo) =>{
   try{

      const email = userUpdateInfo.userInfo;
      const roll =  'shop manager';
      const shopeName = userUpdateInfo?.shopeName;

      const result = await UsersCollection.findOneAndUpdate(
         { email },
         { $set: { role: roll , shopeName: shopeName } },
         { new: true } // To return the updated document
      );

      if (result) {
         console.log('User information updated successfully', result);
         return result;
      } else {
         console.log('User not found. No update performed.');
         return { message: 'User not found. No update performed.' };
      }
       
   }catch(error){
      console.error('Error update user information',error)
      throw error;
   }
 }

 const getUserInfoDatabase = async (userEmail) => {
   console.log('top level', userEmail);
   try {
     const userInfo = await UsersCollection.findOne({ email: userEmail });
     console.log('user data retrieved successfully', userInfo);
     return userInfo;
   } catch (error) {
     console.log('user data retrieval error', error);
     throw error; // You might want to throw the error to handle it elsewhere
   }
 };


 const productAddedhere = async (productInfo) =>{
    
    try{
      const { shopeName} = productInfo;
      console.log(shopeName);
      const productCount = await productCollection.aggregate([
         {$match:{shopeName}},
         {$group:{_id:null, count:{$sum:1}}}
      ])

      const productLimite = (await ShopeCollection.findOne({shopeName}))?.productLimit || 0;

      if (productCount.length > 0 && productCount[0].count === productLimite ) {
         console.log('your limited finish');
         return {message:"Your Limited has been reached"}
      }

      const productAdded = await productCollection.create(productInfo)
      console.log('product added ', productAdded);
      if (productAdded) {
         console.log('product added succesfully',productAdded );
         return productAdded
      }else{
         console.log('product dont added');
      }
   }catch(error){
      console.log('product don,t  added');
   }
 }

 const getProductDatabase = async (email) =>{
   try{
      const findShopAdminEmail = await UsersCollection.find({
         $or:[
           {email: email},
           {subShopManger:{ $elemMatch:{email:email}}}
         ]
       });
 
       console.log(findShopAdminEmail,'35 cheek');
 
       const shopEmail = findShopAdminEmail[0].email || email ;

      const productData = await productCollection.find({ userEmail: shopEmail})
      const findAdmin = await UsersCollection.findOne({email:email});
      if(findAdmin.role === 'admin'){
         const finDataAllShop = await productCollection.find()
         return finDataAllShop;
      }
      console.log('proudct get succesfully');
      return productData;
   }catch(error){
      console.log('product not get data');
   }

 }

 const premiumIncreaseDatabase = async (premiuminfo) =>{
          try{

         const {price: usd ,limited,shopeName, userEmail : adminEmail } = premiuminfo
         const updateLimited = await ShopeCollection.findOneAndUpdate(
            {shopeName},
            {$inc:{productLimit:limited }},
            {new: true}
         )
         if(updateLimited){
            console.log('product limited increase');
            
         }else{
            console.log('hope name is not funed');
         }

         //  const incomeInfo = {usd,shopeName ,userEmail : adminEmail}
          const addIncome = await AdminIncome.findOneAndUpdate(
            {shopeName},
            {$inc: {usd}, $set:{adminEmail}},
            {new: true, upsert:true}
          )
          if (addIncome) {
            console.log('addmin income added');
            return addIncome
          }

          }catch(error){
            console.log('premium increase is not added', error);
          }
 }

 const getShopeInfoData = async (shopInfo) =>{
   try{
      const shopeResult = await UsersCollection.findOne({email: shopInfo.userEmail})
      console.log('shop info is collected');
      return shopeResult;

   }catch(error) {
      console.log('shop info not here', error);
   }
 }

 const deletedProductData = async(id) =>{
     try{

       const deletedProduct = await productCollection.findByIdAndDelete(id)
       if (deletedProduct) {
        return  ({ message: 'Product deleted successfully' });
       } else {
         return ({ message: 'Product not found' });
       }

     }catch(error){
      console.log('product deleted error ' , error);
     }
 }


 const updateProductData = async(id,productInfo) =>{
     try{
       const updateProduct = await productCollection.findByIdAndUpdate(
         id,
         {
            productLocation: productInfo.productLocation,
            productCategory: productInfo.productCategory,
            productQuantiy: productInfo.productQuantiy,
            productCost: productInfo.productCost,
            productProfit: productInfo.productProfit,
            productDescription: productInfo.productDescription,
          },
         {new:true, runValidators:true}
       )
       if (updateProduct) {
         console.log('Product updated successfully:', updateProduct);
       } else {
         console.log('Product not found.');
       }

     }catch(error){
      console.log('product dont update here');
     }
 }


 const getUserAllData = async( req, res) =>{
      try{
         const userDAta = await UsersCollection.find()
         console.log(userDAta);
         return userDAta;
      }catch(error){
         console.log('user dont get here ');
      }
 }


 const getShopListData = async()=>{
   try{
      const shopListData = await ShopeCollection.find()
      return shopListData
   }catch(error){
      console.log(error);
   }
 }


 const setCouponOffersDate = async(data) =>{
   try{
      console.log(data);
      const parseDate = (dateString) => parse(dateString, 'dd/MM/yyyy', new Date());
      const coupon = new Coupon({
         startDate: parseDate(data.sartDate),
         endDate: parseDate(data.endigDate)
      })

      const setCouponOffer = await coupon.save();

      if (setCouponOffer) {
            console.log('Coupon set successfully');
            return setCouponOffer;
         }

   }catch(error){
      console.log(error);
   }
 }

 const getOfferDateTimeData = async () => {
   try {
      const getofferTime = await Coupon.find();
      const currentDate = new Date();
      
      const timeDifference = getofferTime.map(coupon => ({
         endDate: coupon.endDate,
         timeDifference: coupon.endDate.getTime() - currentDate.getTime(),
      }));

      return { getofferTime, timeDifference };
   } catch (error) {
      console.log('coupon dont get ', error);
   }
};


 const getProducteffersAndNomalData = async(id) =>{
   try{

      const currentDate = new Date();
      const coupon = await Coupon.findOne({
          startDate: { $lte: currentDate },
          endDate: { $gte: currentDate }
      });

      const product = await productCollection.findById(id);

     if (currentDate >= coupon.startDate && currentDate <= coupon.endDate) {
      if (product.productQuantiy > 0) {
         const dicounstPrice = product.sellingPrice - product.productDiscount;

      // product.productQuantiy -=1 ;
      // product.SaleCount += 1;

      // await product.save();

      const discounInfo = {
         discounted: true,
         discountedPrice : dicounstPrice
      }

      return { product, discounInfo }
      }else{
         return { massage:'product not available', product}
      }
      
     } else{
      return { massage:'discount not allow ', product}
     }

   }catch(error){
      console.log(error);
   }
 }


 const salesCollectionAddData = async (id, info) => {
   try {
     console.log(id, info);
     const addedSales = await salesCollection.create(info);
     console.log('added sale here ', addedSales);
     if (addedSales) {
       const findProduct = await productCollection.findById(id);
 
       findProduct.SaleCount += 1;
       findProduct.productQuantiy -= 1;
 
       await findProduct.save();

       return {massage:'product addeded',addedSales,findProduct}
     } else {
       console.log('sales collection not added');
     }
   } catch (error) {
     console.log('product not include ', error);
   }
 };




 const salesHistoryData = async (email,currentPage,productperpage,sortDirection) => {
   try {
      console.log(email,currentPage,productperpage,sortDirection,'form the history data');
      
      let sortOrder;
      if (sortDirection === 'true') {
         sortOrder = 1;
      }else{
         sortOrder = -1;
      }

      const findShopAdminEmail = await UsersCollection.find({
         $or:[
           {email: email},
           {subShopManger:{ $elemMatch:{email:email}}}
         ]
       });
 
       console.log(findShopAdminEmail,'35 cheek');
 
       const shopEmail = findShopAdminEmail[0].email || email ;

      console.log(sortOrder,'short order list');

      const salesHistory = await salesCollection
         .find({ userEmail: shopEmail })
         .sort({ profit: sortOrder })  
         .skip((currentPage - 1) * productperpage)
         .limit(productperpage);

      if (salesHistory.length > 0) {
         console.log('Sales collection retrieved successfully', salesHistory);
         return salesHistory;
      } else {
         console.log('Sales collection is empty');
         return [];
      }
   } catch (error) {
      console.log('Something went wrong', error);
      throw error;  // Propagate the error to the calling function or handle it as needed
   }
};

 


module.exports = {inserUserDAta ,setCouponOffersDate , shopeInsertData,userUpdateInfo, getUserInfoDatabase , productAddedhere , getProductDatabase , premiumIncreaseDatabase,getShopeInfoData,deletedProductData,updateProductData,getUserAllData, getShopListData,getProducteffersAndNomalData,getOfferDateTimeData,salesCollectionAddData,salesHistoryData}