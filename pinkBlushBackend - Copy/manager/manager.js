const Products = require('../model/products')
const Blush = require('../model/Blush')
const Cart = require('../model/cart')
const Signup = require('../model/signup')
const Auth = require('../model/authtoken')
const Placeorder = require('../model/placeorder')
const middleware = require('../middleware/authentication');
const jwt = require('jsonwebtoken');
const csv = require('csvtojson')
const fs = require('fs');
const parse = require('csv-parser')
const { Console } = require('console')
const moment = require('moment')

let signup = async (body) => {
    // if (!body.name || !body.contact || !body.email || !body.password) {
    //     throw new BadError("Please Enter all the details")
    // }
    let user = {
        name: body.name,
        contact: body.contact,
        email: body.email,
        password: body.password,
    }
    // let isExist = await Signup.findOne({ where: { email: body.email }, raw: true })
    // if (isExist) {
    //     throw new BadError("Email already exist!")
    // }
    let users = await Signup.create(user, { raw: true });
    const token = jwt.sign({ email: users.email, id: users.id }, 'secret_this_should_be_longer', { expiresIn: '1h' });

    let authtoken = { token: token, userid: users.id }
    let userToken = await Auth.create(authtoken);
    return { authtoken }

}

let login = async (body) => {
    // if (!body.email) {
    //     throw new BadError("Provide email");
    // }
    // if (!body.password) {
    //     throw new BadError("Provide Password");
    // }
    let user = await Signup.findOne({ where: { email: body.email, password: body.password }, raw: true });
    let status =user.status
    if (!user) {
        throw new BadError("user not found")

    }
    const token = jwt.sign({ email: user.email, id: user.id }, 'secret_this_should_be_longer', { expiresIn: '1h' });
    let b = await Auth.update({ token: token }, { where: { userid: user.id } });
    return { token,user,status }
}

let uploadProducts = async (req) => {
let totalrecords1;
let duplicate2;
let newInserted3;
let array1;
let fileName = req.file.filename
const csvFilePath = `${__dirname}/../uploads/${fileName}`
const jsonArray = await csv().fromFile(csvFilePath);

let totalrecords;
let duplicate = 0;
let newInserted = 0;
array1 = jsonArray
for (let index = 0; index < array1.length; index++) {
    const element = array1[index];
    let data = await Blush.findAll({ where: { productId: element.productId }, raw: true })
    if (data == '') {
        await Blush.create(element, { raw: true });
        newInserted++;
    } else if (data !== '') {
        duplicate++;
    }
}
totalrecords = await Blush.count();
totalrecords1 = totalrecords;
duplicate2 = duplicate;
newInserted3 = newInserted;
return { totalrecords1, duplicate2, newInserted3 }

}


let getAllProducts = async () => {
    let product = await Products.findAll({ raw: true })
    return { product };

}

let getAllBlush = async (body) => {
 if (body.search) {
     let allData = await Blush.findAll({
            where: {
                name: { $like: `%${body.search}%` }
            }
        }, { raw: true })
        console.log(allData)
    return{allData}
    }
    let blush = await Blush.findAll({ raw: true })
    return { blush }
}

let getfilter=async(body)=>{
    console.log(body);
    let find={}
    if(body.name){
        find={name:body.name}
    }
    if(body.price){
        find={price:body.price}
    }
    if(body.name && body.price){
        find={name:body.name,price:body.price}
    }
    console.log(find)
return await Blush.findAll( { where:find,raw: true })
}


let postToCart=async(req,userid)=>{
    // console.log(req.body.productId,"this is productrids")
// console.log("manager");
let newPrice;
let check = await Cart.findAll({ where: { orderid: 0, productId: req.body.productId ,customerid:userid} }, { raw: true });
let findProduct = await Blush.findOne({ where: { productId: req.body.productId } }, { raw: true });
console.log(check);
if (check == "") {
    console.log("notexist");
    newPrice = findProduct.price
    let newuser = {
                 productId:req.body.productId,
                customerid:userid,
                name:findProduct.name,
                shade:findProduct.shade,
                price:newPrice,
                quantity:findProduct.quantity,
                image:findProduct.image

    }
    console.log(newuser, "new");
    let data = await Cart.create(newuser);
    let findcount = await Cart.findAll({where:{customerid:userid,orderid:0},raw:true})
    let qty =0
    findcount.filter(el =>qty= qty + el.quantity )
    console.log(qty);
// console.log(findcount)
return{qty}


} else if (check !== '') {
    let check1 = await Cart.findOne({ where: { orderid: 0,customerid: userid, productId: req.body.productId } }, { raw: true });
    let qty1 = parseInt(check1.quantity + 1)
    let newPrice1 = (check1.price * qty1)
    let newProduct = {
        quantity: qty1,
        price: newPrice1,
    }
    console.log(qty1, newPrice1);
    let updatecart=  await Cart.update(newProduct, { where: { orderid: 0,customerid: userid,  productId: req.body.productId } }, { raw: true });
    let findcount = await Cart.findAll({where:{customerid:userid,orderid:0},raw:true})
    let qty =0
    findcount.filter(el =>qty= qty + el.quantity )
    console.log(qty);

return{qty}
}

}


let placeorder=async(body)=>{

    let oldcustomer = await Signup.findOne({ where: { id:body.customerid }, raw: true });
    console.log(oldcustomer, "usr details");
    let orderitem = {
        customerid:body.customerid,
        Date:body.Date,
        total:body.total,
    }
    let order = await Placeorder.create(orderitem, { raw: true });
    console.log(order)

    let updateOrderidCart = await Cart.findAll({where:{orderid:0,customerid:order.customerid},raw:true})
    if (updateOrderidCart !== "") {
        let updateCart = await Cart.update({ orderid: order.id }, { where: {orderid:0,customerid: order.customerid } }, { raw: true })
    }
    return { order }
} 

let getItemsToCart = async (body) => { 
    console.log(body,"got customeriddd");
    if (body.productId) {
let find={}
     let isexist = await Blush.findOne({where:{productId:body.productId},raw:true})
     let exist = await Cart.findOne({where:{orderid: 0,productId:body.productId},raw:true})
    console.log(exist,"ye laready hai")
          
            let newqty = (exist.quantity + 1)
            let minusqty = (exist.quantity - 1)
            let newPrices = (isexist.price * newqty)
            let minusPrice = (isexist.price * minusqty)
            console.log(newqty)
         
if(body.string === 'add'){
find={
    quantity: newqty,
    price:newPrices 
}

}
if(body.string === 'remove'){
    find={
        quantity: minusqty,
        price:minusPrice
    }
}
let update =  await Cart.update(find, { where: { orderid: 0,  productId: body.productId } }, { raw: true });
let cartItem = await Cart.findAll({where:{customerid:body.cosomerId,orderid:0}, raw: true })
console.log(cartItem);
let qty =0
cartItem.filter(el =>qty= qty + el.quantity )
console.log(qty);

return{qty,cartItem}
return { cartItem:cartItem };
    }
else{
    let cartItem = await Cart.findAll({where:{customerid:body.costomerId,orderid:0}, raw: true })
    console.log(cartItem);
    let qty =0
    cartItem.filter(el =>qty= qty + el.quantity )
    console.log(qty);

return{qty,cartItem}
    return { cartItem:cartItem };
}
  
}

let deleteCartItem = async (id) => {
    let deletedItem = await Cart.destroy({ where: { id: id } })
    return { deletedItem }

}

let deletefromCart = async (id) => {
    let deletedOrder = await Cart.destroy({ where: { customerid: id } })
    console.log(deletedOrder)
    return { deletedOrder }
}

let getmyorder = async (body) => {
    // console.log(body);
    // console.log(body.itemId,"this is id")
    // if(body.itemId){
    //     let itemsfromcart = await Cart.findAll( {where:{orderid:body.itemId},raw:true})
    //     console.log(itemsfromcart,"item from cart")
    //     return {itemsfromcart};
    // }
    
  if(body.status==1){

    let ordersfromorder = await Placeorder.findAll({ raw: true })
    let orderfromcart = await Cart.findAll( {raw: true,})
    return {ordersfromorder,orderfromcart };
  }
  else {
    let myorders = await Placeorder.findAll({where:{customerid:body.customerid}, raw: true })
    console.log(myorders,"mera hai ye order")
    let myorderfromcart = await Cart.findAll({where:{customerid:body.customerid}, raw: true })
    console.log(myorderfromcart,"milgaya")
    return { myorders,myorderfromcart};
  }
}

let getItemCount = async (body) => {
    console.log(body);
    let itemsfromcart = await Cart.count({where:{orderid:0,customerid:body.id}, raw: true })
    console.log(itemsfromcart,"milgaya")
    return { itemsfromcart };
}

let getusercountforchart=async(req)=>{


    let todayStartDate = new Date(moment().startOf('date').format('YYYY-MM-DD hh:mm:ss'));
    let startOfMonth = new Date(moment().startOf('month').format('YYYY-MM-DD hh:mm:ss'));
    let endOfMonth = new Date(moment().endOf('month').format('YYYY-MM-DD hh:mm:ss'));

    let finduser10 = await Signup.count({
        where: { createdAt: { $gte: startOfMonth, $lte: endOfMonth }},
        raw: true
    })
    // console.log(finduser10,"oct")

    let finduser11 = await Signup.count({
        where: { createdAt: { $gte: ('2022-11-01'), $lte: ('2022-11-30')}},
        raw: true
    })
    // console.log(finduser11,"nov")


    let finduser12 = await Signup.count({
        where: { createdAt: { $gte: ('2022-12-01'), $lte: ('2022-12-31')}},
        raw: true
    })
  

    let todayuser = await Signup.count({
        where: { createdAt: { $gte: todayStartDate }},
        raw: true
    });
   
    let currentmonth = await Signup.count({
        where: { createdAt: {$gte: startOfMonth, $lte: endOfMonth  }},
        raw: true
    });
    console.log(currentmonth,"currentmonth")

    return {finduser10,finduser11,finduser12,todayuser,currentmonth}
}





module.exports = {
    signup:signup,
    login:login,
    uploadProducts: uploadProducts,
    getAllProducts: getAllProducts,
    getAllBlush: getAllBlush,
    postToCart:postToCart,
    getItemsToCart:getItemsToCart,
    deleteCartItem:deleteCartItem,
    placeorder:placeorder,
    getfilter:getfilter,
    deletefromCart:deletefromCart,
    getmyorder:getmyorder,
    getItemCount:getItemCount,
    getusercountforchart:getusercountforchart
    

}

// ---------------------code to upload csv file data to backend model table----------------
// let uploadProducts=async(req)=>{
//     console.log(req.file)
//     let fileName = req.file.filename
//     const csvFilePath = `${__dirname}/../uploads/${fileName}`
//     const jsonArray = await csv().fromFile(csvFilePath);

//     csv()
//         .fromFile(csvFilePath) 
//         .then((jsonObj) => {
//             console.log('json', jsonObj);

//             return Blush.bulkCreate(jsonObj, { raw: true });
//         })
// }
// --------------code to avoide duplicate data entry and save only new data(as well return total record, duplicate, and new records )
// let uploadProducts = async (req) => { 
//     // ------mongoose-----
//     // const admin = new Admin({
//     //     name: "sachin",
//     //     email: "sacin@123",
//     //   });
//     //   admin.save();
// // .........................
//     let newcount1;
//     let newinserted1;
//     let duplicate1;
//     let existingcount = await Blush.count()
//     console.log(existingcount, "its existing count")
//     const jsonArray=await csv().fromFile(csvFilePath);
//     csv()
//         .fromFile(req.file.path)
//         .then(async (jsonObj) => {
//         })
//         {
//             // let data = jsonObj
//             fs.createReadStream(`${__dirname}/../uploads/${req.file.filename}`,)
//                 .pipe(parse({ delimiter: ",", from_line: 2 }))
//                 .on("data", async (row) => {
//                     //     console.log(row, "ALl");
//                     await Blush.findOrCreate({
//                         where: {
//                             name: row.name,
//                             shade: row.shade,
//                             price: row.price,
//                             image: row.image
//                         },
//                     });
//                     let newcount =  await Blush.count()
//                     newcount1 = newcount
//                     // console.log(newcount1,"its new count")
//                     let newinserted = (newcount1 - existingcount)
//                     newinserted1 = newinserted
//                     // console.log(newinserted1,"its inserted count")
//                     let duplicate = (newcount1 - newinserted1)
//                     duplicate1=duplicate
//                     // console.log(duplicate1,"its duplicate")
          

//                 })
                
   
//                 console.log(newcount1,"its new count")
//                 console.log(newinserted1,"its inserted count")
//                 console.log(duplicate1,"its duplicate")
        

// }
// }


// -----------------------try and error of csv upload--------------------
// let uploadProducts = async (req) => {
//         const admin = new Admin({
//         name: "sachin",
//         email: "sacin@123",
//       });
//       admin.save();
//     let totalrecords1;
//     let duplicate2;
//     let newInserted3;
//     let array1;
//     let fileName = req.file.filename
//     const csvFilePath = `${__dirname}/../uploads/${fileName}`
//     const jsonArray = await csv().fromFile(csvFilePath);
//     // csv()
//     //     .fromFile(csvFilePath)
//     //     .then(async (jsonObj) => {
//     //         console.log("json");

//     //     })
//     let totalrecords;
//     let duplicate = 0;
//     let newInserted = 0;
//     array1 = jsonArray
//     for (let index = 0; index < array1.length; index++) {
//         const element = array1[index];
//         let data = await Blush.findAll({ where: { id: element.id }, raw: true })
//         console.log(data, "duplicate item in table");
//         if (data == '') {
//             console.log('created');
//             await Blush.create(element, { raw: true });
//             newInserted++;
//         } else if (data !== '') {
//             duplicate++;
//         }
//     }
//     totalrecords = await Blush.count();
//     totalrecords1 = totalrecords;
//     console.log(totalrecords1, "totalrecords1");
//     duplicate2 = duplicate;
//     newInserted3 = newInserted;
//     console.log(totalrecords1, "total rec", duplicate2, "dupli", newInserted3, "newinserted");
//     return { totalrecords1, duplicate2, newInserted3 }

// }
// ---------------csv upload in mangoose--------------------
// let uploadProducts = async (req) => {
  
//     let totalrecords1;
//     let duplicate2;
//     let newInserted3;
//     let array1;
//     let fileName = req.file.filename
//     const csvFilePath = `${__dirname}/../uploads/${fileName}`
//     const jsonArray = await csv().fromFile(csvFilePath);
    
//     let totalrecords;
//     let duplicate = 0;
//     let newInserted = 0;
//     array1 = jsonArray
//     for (let index = 0; index < array1.length; index++) {
//         const element = array1[index];
//         let data = await Blush.find({ where: { id: element.id }, raw: true })
//         // console.log(data, "duplicate item in table");
//         if (data == '') {
//             console.log('created');
//             await Blush.create(element, { raw: true });
//             newInserted++;
//         } else if (data !== '') {
//             duplicate++;
//         }
//     }
//     totalrecords = await Blush.count();
//     totalrecords1 = totalrecords;
//     console.log(totalrecords1, "totalrecords1");
//     duplicate2 = duplicate;
//     newInserted3 = newInserted;
//     console.log(totalrecords1, "total rec", duplicate2, "dupli", newInserted3, "newinserted");
//     return { totalrecords1, duplicate2, newInserted3 }
    
//     }
    