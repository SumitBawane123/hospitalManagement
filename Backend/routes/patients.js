const express = require('express')
const router = express.Router();
const Patient = require('../models/Patient')


//for fetching all patients
router.route('/').get((req,res)=>{
    Patient.find()
        .then((patients)=>{
                res.json(patients)
        })
        .catch((error)=>{
            res.json(error)
        })
})


// to add new Patient 
router.route('/add').post((req,res)=>{
    const {name, age, gender} = req.body;

    const newPatient = new Patient({name , age , gender})

    newPatient.save()
        .then((savedData)=>{
            res.json(savedData)
        })
        .catch((error)=>{
            res.json(error)
        })
})

//to update
router.route('/update/:id').post((req,res)=>{
    const id = req.params.id
    Patient.findById(id)
        .then((patient)=>{
            if(!patient){
                return res.status(404).json('Patient Not Found');
            }

            patient.name = req.body.name;
            patient.age = req.body.age;
            patient.gender = req.body.gender;

            Patient.save()
                .then((patientData)=>{
                    res.send("Patient Updated")
                })
                .catch((error)=> res.json(error))
        })
        .catch(error=> res.status(400).json(error))
})


// to delete

router.route('/delete/:id').delete((req,res)=>{
    Patient.findByIdAndDelete(req.params.id)
        .then((patient)=>{
            if(!patient){
               return res.status(404).json("Patient Not Found");
            }
            res.json(patient)
        })
        .catch((error)=> res.json(error))
})

module.exports = router

