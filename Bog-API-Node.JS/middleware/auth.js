const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../services/user.service');
const auth=async(req,res,next)=>{
    try{
        // Authorization
        const token= req.headers["jwt"];
        // console.log(token)
        if(!token){
        return res.status(401).send({message:"unauthorized user token1"});
    }
    const payload = jwt.verify(token,"jwtSecret")
    const {email} = payload;
    const user=await findUserByEmail(email);
    if(!user){
        return res.status(401).send({message:"User not found"});
    }
        req.user = user;
        next();

    }catch(error){
        // return res.status(401).send({message:error.message});
     
         res.status(401).send({ message: " Token expired login again" });
        
   
    }
}
// const auth=async(req,res,next)=>{
//     try{
//         const token= req.headers["token"];
//         if(!token){
//         return res.status(401).send({message:"unauthorized user token"});
//     }
//     // const token = authHeader.split(' ')[1];
//     const payload = jwt.verify(token,"jwtSecret")
//     const {email} = payload;
//     const user=await findUserByEmail(email);
//     if(!user){
//         return res.status(401).send({message:"unauthorized user"});
//     }
//         req.user = user;
//         next();

//     }catch(error){
//         return res.status(401).send({message:error.message});
//     }
// }


// const auth = async (req, res, next) => {
//     try {
//         // Use Bearer token convention, also check for both lowercase and uppercase 'Authorization' headers
//         const authHeader = req.headers['authorization'] ;
//         if (!authHeader ) {
//             return res.status(401).send({ message: "Unauthorized: No token provided" });
//         }
//          console.log(authHeader)
//         // Extract the token from the Authorization header
//         const token = authHeader;
//         const payload = jwt.verify(token, "jwtSecret"); // Ensure 'jwtSecret' is securely managed
//         const { email } = payload;

//         const user = await findUserByEmail(email);
//         if (!user) {
//             return res.status(401).send({ message: "Unauthorized: User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         return res.status(401).send({ message: error.message });
//     }
// };

module.exports = {auth};