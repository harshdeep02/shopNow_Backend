import mongoose from 'mongoose';
// const mongooseURl = "mongodb://127.0.0.1:27017/shopnow"
const mongooseURl = "mongodb+srv://harshdeep7887:harshdeepshopnow@shopnowcluster.muumria.mongodb.net/?retryWrites=true&w=majority&appName=shopNowCluster"

 export const connectToMongo = async()=>{
  try{
    await mongoose.connect(mongooseURl,{
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000           
      })
    .then(()=>{console.log("connected Sucessfully")})
    .catch(()=>{console.log("not connected")})
  }

  catch(error){
    console.log(error);
  }
        
}

