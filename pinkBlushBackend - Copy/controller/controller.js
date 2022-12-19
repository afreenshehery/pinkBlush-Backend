const sequelize = require('sequelize')
const manager = require('../manager/manager')

let signup = async (req, res, next) => {
    return manager.signup(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data,
                token: data.authtoken.token,
                id: data.authtoken.userid
            }
            return res.json(result);
        }).catch(next);
}

let login = async (req, res, next) => {
    return manager.login(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data,
                token: data.token,
                id: data.user.id,
                status:data.status
            }
            return res.json(result);
        }).catch(next);
}

let uploadProducts = async (req, res, next) => {
    return manager.uploadProducts(req)
        .then(data => {
            let result = {
                status: 200,
                data: data,
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllProducts = async (req, res, next) => {
    return manager.getAllProducts()
        .then(data => {
            let result = {
                status: 200,
                products: data.product
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllBlush = async (req, res, next) => {
    return manager.getAllBlush(req.body)
        .then(data => {
            let result = {
                status: 200,
                Blush: data.blush,
                alldata: data.allData
            }
            return res.json(result);
        })
        .catch(next);
}

let postToCart = async (req, res, next) => {
    console.log("hiiuujjhj")
    return manager.postToCart(req,req.userid)
        .then(data => {
            let result = {
                status: 200,
                data: data.qty
            }
            return res.json(result);
        })
        .catch(next);
}

let getItemsToCart = async (req, res, next) => {
    return manager.getItemsToCart(req.body)
        .then(data => {
            let result = {
                status: 200,
                cartitem: data.cartItem,
                qty:data.qty

                // length: data.length
            }
            return res.json(result);
        })
        .catch(next);
}
let placeorder = async (req, res, next) => {
    return manager.placeorder(req.body, req.id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getfilter = async (req, res, next) => {
    return manager.getfilter(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let deleteCartItem = async (req, res, next) => {
    return manager.deleteCartItem(req.params.id)
        .then(data => {
            let result = {
                status: 200,
                delete: data.deletedItem
            }
            return res.json(result);
        })
        .catch(next);
}

let deletefromCart = async (req, res, next) => {
    return manager.deletefromCart(req.params.id)
        .then(data => {
            let result = {
                status: 200,
                delete: data.deletedOrder
            }
            return res.json(result);
        })
        .catch(next);
}

let getmyorder = async (req, res, next) => {
    return manager.getmyorder(req.body)
        .then(data => {
            let result = {
                status: 200,
                // data:data
                myorders: data.myorders,
                myordersfromcart: data.myorderfromcart,
                ordersfromorder:data.ordersfromorder,
                orderfromcart:data.orderfromcart,
                itemsfromcart:data.itemsfromcart


            }
            return res.json(result);
        })
        .catch(next);
}


let getItemCount = async (req, res, next) => {
   
    return manager.getItemCount(req.body)
        .then(data => {
            let result = {
                status: 200,
                cartitem: data.itemsfromcart,
                // length: data.length
            }
            return res.json(result);
        })
        .catch(next);
}

let getusercountforchart = async (req, res, next) => {
   
    return manager.getusercountforchart(req)
        .then(data => {
            let result = {
                status: 200,
                // data:data,
               usercountbefore:data.finduser10,
               usercountafter:data.finduser11,
               usercount:data.finduser12,
               todayuser:data.todayuser,
               currentmonth:data.currentmonth

            }
            return res.json(result);
        })
        .catch(next);
}


module.exports = {
    signup: signup,
    login: login,
    uploadProducts: uploadProducts,
    getAllProducts: getAllProducts,
    getAllBlush: getAllBlush,
    postToCart: postToCart,
    getItemsToCart: getItemsToCart,
    deleteCartItem: deleteCartItem,
    placeorder: placeorder,
    getfilter: getfilter,
    deletefromCart: deletefromCart,
    getmyorder: getmyorder,
    getItemCount:getItemCount,
    getusercountforchart:getusercountforchart

}