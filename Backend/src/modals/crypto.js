import mongoose from "mongoose"
 const cryptoSchema = new mongoose.Schema({
    coin:{
        type:String,
        required:true,
        index:true
    },
    price:{
        type:Number,
        required:true,
    },
    marketCap:{
        type:Number,
        required:true
    },
    change24h:{
        type:Number,
        required:true
    },
    timesstamp:{  //useful for historical data queries
        type: Date, 
        default: Date.now, 
        index: true  
    }
 });
 export default mongoose.model('crypto',cryptoSchema);