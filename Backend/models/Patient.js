const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true
    }
})

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;