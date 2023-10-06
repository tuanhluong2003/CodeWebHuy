const mongoose = require('mongoose');
const qlsv = new mongoose.Schema({
     msv : Number,
     fullName: String,
     birthDay: String,
     addRess : String,
     phoneNumber : String,
     image : String
    },{collection:'qlsv'});
    
module.exports = mongoose.model('QLSV', qlsv);