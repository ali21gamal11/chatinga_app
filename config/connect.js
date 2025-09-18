const mongoose = require('mongoose');

async function connect(){

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connecting to chating app");
    }catch(err){
        console.log(`fail to connect error=>:${err}`);
    }
}

module.exports = connect