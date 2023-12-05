const {userDataSave,shopeList, updateUserInfo, getUserInfo, productAddDatabase, getProductapi, premiumIncrease, getShopeInfoapi, deletedProductapi, updateProductapi, getUserAllApi, getShopListApi, setCouponOffersapi, getOfferAndSellingApi, getOffergetTimeApi, salesCollectionSaveApi, salesHistoyApi} = require('../../../api/users/controllers')
const createAuthCookie = require('../../../api/users/controllers/createAuthCookie')
const { isShopAdminApi, isAdminApi } = require('../../../api/users/controllers/rollVerify')
const { shopAccessApi } = require('../../../api/users/controllers/shopAccess')
const shopAdminAnalyticeApi = require('../../../api/users/controllers/shopAdminAnalytice')
const { shopAnalytisApi } = require('../../../api/users/controllers/shopAnalytisapi')
const { stripePaymentIntent } = require('../../../api/users/controllers/stripe')
const verifyAdmin = require('../../../middlewares/verifyAdmin')
const verifyShopManager = require('../../../middlewares/verifyShopManger')
const verifyToken = require('../../../middlewares/verifyToken')

const router = require('express').Router()


router.post('/users',userDataSave)
router.post('/shopcollection', shopeList)
router.put('/userUpdate',updateUserInfo)
router.get('/user',getUserInfo)

router.post('/productAdd',productAddDatabase)
router.get('/productget/:email',getProductapi)
router.post('/suscription',premiumIncrease)

router.get('/shopeInfo',getShopeInfoapi)
router.delete('/productDelete/:id', deletedProductapi)
router.put('/updateproduct/:id',updateProductapi)

router.get('/usersget',getUserAllApi)
router.get('/shopelist',getShopListApi)
router.post('/coupondate',setCouponOffersapi)

router.get('/prodctoffnormal/:id',getOfferAndSellingApi)
router.get('/getofferTime', getOffergetTimeApi)
router.post('/create-payment-intent',stripePaymentIntent)

router.post('/salescollection/:id',salesCollectionSaveApi)
router.get('/saleshistory',salesHistoyApi)
router.post('/jwt', createAuthCookie)

router.get('/users/shopmanager/:email',isShopAdminApi)
router.get('/users/admin/:email',isAdminApi)

router.get('/shopProfiteAnalytis/:email',shopAnalytisApi)
router.get('/adminIncomeAnalytice/:email',shopAdminAnalyticeApi)

router.post('/shopAccess',shopAccessApi)


module.exports = router 