const express = require('express');
var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);   
router.get('/productDetails', ctrlUser.productDetails);    
router.get('/productsDetails', ctrlUser.productsDetails);

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
// router.post('/createAuction', upload.single('file'),ctrlUser.createAuction);
router.get('/userDetails', ctrlUser.userDetails); 
router.post('/getUserName', ctrlUser.getUserName);
router.post('/createAuction',upload.any(),ctrlUser.createAuction); //upload.any(),
router.post('/productdetailssave',ctrlUser.productdetailssave); 
router.post('/changepublickeyapi',ctrlUser.changepublickey)
router.post('/getAuctionById', ctrlUser.getAuctionById);

router.put('/changepassword',ctrlUser.changepassword);
router.put('/forgotpassword',ctrlUser.forgotpassword);
router.put('/storeselectedproduct',ctrlUser.showselectedproducts)


module.exports = router;



