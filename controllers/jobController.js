const Job = require("../models/Job");


// Add Job

exports.createJob = async(req,res)=>{

    try{

        const job = await Job.create(req.body);


        res.status(201).json({
            message:"Job created",
            job
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



// Get Jobs

exports.getJobs = async(req,res)=>{

    try{

        const jobs = await Job.find();


        res.json(jobs);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};