const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');
const middleware = require('../middleware/authentication')

let fileUploadHelper  = require('../fieluploads/fileuploads');

router.post('/signup',controller.signup)
router.post('/login',controller.login)
router.post('/uploadProducts',fileUploadHelper.uploadUserProfileImage.single('file'),controller.uploadProducts)
router.get('/getAllProducts',controller.getAllProducts)
router.post('/getAllBlush',controller.getAllBlush)
router.post('/postToCart',middleware.authenticateToken,controller.postToCart)
router.post('/getItemsToCart',controller.getItemsToCart)
router.delete('/deleteCartItem/:id',controller.deleteCartItem)
router.post('/placeorder',controller.placeorder)
router.post('/getfilter',controller.getfilter)
router.delete('/deletefromCart/:id',controller.deletefromCart)

router.post('/getmyorder',controller.getmyorder)

router.post('/getItemCount',controller.getItemCount)

router.get('/getusercountforchart' ,controller.getusercountforchart)





module.exports=router;





