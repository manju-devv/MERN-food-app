import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next) => {
  const {token} = req.headers;
  if(!token){
    return res.json({success:false,message:"Not Authorised login again"});
  }
  try{
    const decode_token = jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId = decode_token.id;
    next();
  }catch(e){
    console.log(e);
    res.json({success:false,message:"something went wrong"});
  }
}

export default authMiddleware;