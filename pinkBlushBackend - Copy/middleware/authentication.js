const Signup = require('../model/signup')

const Auth = require('../model/authtoken')

const BadRequestError = require('../errors/baderror');

// --------------ADMIN Validation------------
let authenticateToken = async (req, res, next) => {
  
  console.log(req.headers.token)
  try{
  let token = req.headers.token
  console.log(token)
  let user = await Auth.findOne({ where: { token: token }, raw: true });
  console.log(user.userid)
  let user1 = await Signup.findOne({where:{id:user.userid},raw:true})
console.log(user1)
  if (!user1 ) {
    throw new BadRequestError("User Invalid")
  }
  // if(user1.role === "user"){
  //   throw new BadRequestError("User Invalid")
  // }
req.userid=user.userid
  next()
  }catch (e) {
    console.log(e);
    next(e);
}
}


module.exports = {
    authenticateToken,

  }