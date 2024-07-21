import  jwt from "jsonwebtoken";
const secKey = "authWithHarshDeep"

export const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
     res.status(401).json({error: "don't change the token"})
    }
    try{
        const data  = jwt.verify(token, secKey)
        req.id  = data.id
        next()
    }
    catch{
        return res.status(401).json({error: "don't change the token"})
    }
    
}