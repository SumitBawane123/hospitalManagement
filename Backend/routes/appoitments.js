const express = require('express');
const router = express.Router();
const Appoitment = require('../models/Appoitments')


//Getting All Appoitments
router.route('/').get((req,res)=>{{
    Appoitment.find()
        .then((appoitments)=>res.status(200).json(appoitments))
        .catch((error)=>res.status(400).send('Error : '+error))
}})

//Add new Appoitment
router.route('/add').post((req,res)=>{
    const {patientName , doctorName , date} = req.body

    const appointmentData = new Appoitment({patientName ,doctorName, date})
    appointmentData.save()
        .then((appointmentresult)=> res.status(200).json(appointmentresult))
        .catch((error)=> res.json(error))
})

//update Appointment Data 
router.route('/update/:id').post((req,res)=>{
    const id = req.params.id;
    Appoitment.findById(id)
        .then((appointmentData)=>{
            if(!appointmentData) return res.status(404).json("Appointment not Found")
            
            appointmentData.patientName = req.body.patientName
            appointmentData.doctorName  = req.body.doctorName 
            appointmentData.date = req.body.date

            Appoitment.save()
                .then(()=>{
                    res.json("Appointment Updated")
                })
                .catch((error)=> res.status(400).json(error))            
        })
        .catch((error)=>res.json(error))
})

//Delete 
router.route('/delete/:id').delete((req,res)=>{
    Appoitment.findByIdAndDelete(id)
        .then(()=>{
            res.send("Appoitment Deleted")
        })
        .catch((error)=> res.json(error))
})

module.exports=router;



