const mongoose = require('mongoose');

const appoitmentShema = new mongoose.Schema({
    patientName : {
        type : String,
        required : true
    },
    doctorName : {
        type : String,
        required : true
    },
    date :{
        type : Date,
        required : true
    }
})

const Appoitment = mongoose.model('appointment', appoitmentShema);

module.exports = Appoitment;