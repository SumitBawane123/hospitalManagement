const express = require("express")
const router = express.Router();
const Doctor = require("../models/Doctor")

//Get All Doctors
router.route('/').get((req,res)=>{
    Doctor.find()
        .then((doctorsData)=>{
            res.json(doctorsData)
        })
        .catch((error)=> res.status(400).send(error))
})

//add new doctor
router.route('/add',(req,res)=>{
    const {name,specialty} = req.body;
    const newDoctor = new Doctor({name,specialty})
    newDoctor.save()
        .then((savedDoctor)=>{
            res.json(savedDoctor)
        })
        .catch(error=> res.status(400).json(error))
})

//update doctor
router.route('/update/:id').post((req,res)=>{
    const id = req.params.id;
    Doctor.findById(id)
        .then((doctor)=>{
            if(!doctor){
                return res.send("Doctor Not Found")
            }

            doctor.name = req.body.name
            doctor.specialty  = req.body.specialty 

            doctor.save()
                .then(()=> res.send("Doctor updated"))
                .catch((error)=>res.send(error))
        })
})

//Delete
router.route('/delete/:id').delete((req,res)=>{
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404)
                    .json('Doctor not found');
            }
            res.json('Doctor deleted!');
        })
        .catch(err => res.status(400)
            .json('Error: ' + err));
})

module.exports = router;
