import mongoose from 'mongoose';
// const mongooseURl = "mongodb://127.0.0.1:27017/shopnow"
const mongooseURl = "mongodb+srv://harshdeep7887:harshdeepshopnow@shopnowcluster.muumria.mongodb.net/?retryWrites=true&w=majority&appName=shopNowCluster"

 export const connectToMongo = async()=>{
    await mongoose.connect(mongooseURl)
    .then(()=>{console.log("connected Sucessfully")})
    .catch(()=>{console.log("not connected")})
        
}

