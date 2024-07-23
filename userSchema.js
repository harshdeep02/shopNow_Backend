import mongoose from "mongoose";

const userSchemaa = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
}, {
    autoIndex: false
  })


const User = mongoose.model('user', userSchemaa)
const createIndexes = async () => {
    try {
      await User.collection.createIndex({ email: 1 }, { unique: true, maxTimeMS: 30000 });
      console.log('Index created successfully');
    } catch (err) {
      console.error('Index creation error:', err);
    }
  };
  
export {User, createIndexes}