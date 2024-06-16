const express = require("express")
const mongoose = require("mongoose")
const cors =require("cors")
const bodyParser = require('body-parser')
const app = express();
const appoitments = require('./routes/appoitments')
const doctors = require('./routes/doctors')
const patients = require('./routes/patients')

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(
     'mongodb://localhost:27017/hospitalManagement'
)
.then(()=> console.log("connection establish"))
.catch(()=>console.log('Error while connectong to db'))

app.use('/patients',patients)
app.use('/doctors',doctors)
app.use('/appoitments',appoitments)

app.listen(3000,(req,res)=>{
    console.log('Server is Running..')
})