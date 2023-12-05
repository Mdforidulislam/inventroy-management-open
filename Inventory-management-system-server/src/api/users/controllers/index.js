const {inserUserDAta,shopeInsertData, userUpdateInfo, getUserInfoDatabase, productAddedhere, getProductDatabase, premiumIncreaseDatabase, getShopeInfoData, deletedProductData, updateProductData, getUserAllData, getShopListData, setCouponOffersDate, getProducteffersAndNomalData, getOfferDateTimeData, salesCollectionAddData, salesHistoryData} = require("../../../lib/users");




const userDataSave = async (req,res) =>{
    const userInfo = req.body;
    const result = await inserUserDAta(userInfo);
    res.send(result)
}

const shopeList = async (req, res) =>{
    const shopeInfo = req.body;
    const result = await shopeInsertData(shopeInfo)
    res.send(result)
}

const updateUserInfo = async (req , res) => {
    const userInfo = req.body;
    const result = await userUpdateInfo(userInfo);
    res.send(result)
}

const getUserInfo = async (req, res) =>{
    const userInfo = req.query.userEmail;
    const result = await getUserInfoDatabase(userInfo)
    res.send(result)
}

const productAddDatabase = async (req,res) =>{
    const productInfo = req.body;
    console.log(productInfo);
    const result = await productAddedhere(productInfo)
    res.send(result)
}

const getProductapi = async( req, res) =>{
    const userEamil = req.params.email;
    console.log('get product',userEamil);
    const reuslt = await getProductDatabase(userEamil)
    res.send(reuslt)
}

const premiumIncrease = async (req, res) =>{
    const premiumInfo = req.body;
    const result = await premiumIncreaseDatabase(premiumInfo)
    res.send(result)
}

const getShopeInfoapi = async (req,res) =>{
    const shopeInfo = req.query;
    const result = await getShopeInfoData(shopeInfo)
    res.send(result)
}

const deletedProductapi = async(req, res) =>{

      const id = req.params.id
      console.log(id);
      const result = await deletedProductData(id)
      res.send(result)
}

const updateProductapi = async(req, res) =>{
    const id = req.params.id
    const productInfo = req.body;
    console.log(id, productInfo, 'api page');
    const result = await updateProductData(id, productInfo)
    res.send(result)
}

const getUserAllApi = async(req ,res) =>{
    const result = await getUserAllData()
    res.send(result);
}

const getShopListApi = async(req, res) =>{
    const result = await getShopListData()
    res.send(result)
}

const setCouponOffersapi = async(req,res) =>{
    const couponInfo = req.body;
    console.log(couponInfo);
    const result = await setCouponOffersDate(couponInfo)
    res.send(result)
}

const getOfferAndSellingApi = async(req,res) =>{
    const id = req.params.id;
    const result = await getProducteffersAndNomalData(id)
    res.send(result)
}

const getOffergetTimeApi = async(req, res) => {
     const result = await getOfferDateTimeData()
     res.send(result)
}

const salesCollectionSaveApi =  async(req,res) =>{
    const id = req.params.id;
    const salesInfo = req.body;
    const result = await salesCollectionAddData(id,salesInfo)
    res.send(result)
}

const salesHistoyApi = async(req,res)=> {
    const email = req.query.email;
    const currentPage = req.query.currentPage;
    const productperpage = req.query.productperpage;
    const sortDirection  = req.query.sortDirection;
    console.log('sales history ', email,currentPage,productperpage,sortDirection);
    const result = await salesHistoryData(email,currentPage,productperpage,sortDirection)
    res.send(result)
}


module.exports = {userDataSave , shopeList , updateUserInfo,getUserInfo,productAddDatabase,getProductapi, premiumIncrease,getShopeInfoapi,deletedProductapi,updateProductapi,getUserAllApi,getShopListApi,setCouponOffersapi,getOfferAndSellingApi,getOffergetTimeApi,salesCollectionSaveApi,salesHistoyApi};


