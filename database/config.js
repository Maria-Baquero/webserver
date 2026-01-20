const mongoose = require('mongoose');

const dbCon = async() => {


    try{

        await mongoose.connect( process.env.MONGODB_ATLAS);
        console.log("Database On.");

    }catch(error){

        console.log(error);
        throw new Error('An error has occurred');
    }



}


module.exports = {
    dbCon
}