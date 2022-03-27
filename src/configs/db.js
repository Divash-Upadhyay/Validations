const mongoose = require("mongoose");

const connect= () =>{
    return mongoose.connect(
        "mongodb+srv://dishu:qwerty123456@evaluation.ubmpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
};

module.exports = connect;