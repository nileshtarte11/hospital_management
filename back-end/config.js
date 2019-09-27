const mongoose = require('mongoose');
const db = "mongodb+srv://root:root@cluster0-npkn9.mongodb.net/hospital_management?retryWrites=true&w=majority";

// const db = "mongodb+srv://root:root@cluster0-npkn9.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(db, err => {
    if (err) {
        console.error('Error' + err);
    }
    else {
        console.log('Connect to mongoDB successfully')
    }
})

module.exports = db;