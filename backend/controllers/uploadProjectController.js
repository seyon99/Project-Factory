import express from 'express';
import mongoose from 'mongoose'
import Project from '../models/Project';
import { v4 as uuid } from 'uuid';

// mongoose.connect(process.env.MONGO_URI);
// const db = mongoose.connection;

export const uploadProject = async (req, res, db) => {
    const { descrip, collStat, myStack } = req.body;
    let currUser = res.locals.authData;
    const projectId = uuid();
    const description = descrip;
    const date = new Date().toISOString().slice(0, 10);  
    const userId = `${currUser.firstName} ${currUser.lastName}`;
    const collaborationStatus = collStat;
    const stack = myStack.split(','); // split the comma separated stack into array
    const newJobListing = new Project({ job_id, employer_id, job_description, job_location, job_title, date_posted, contact_name, contact_address, number_applied }, { collection: "joblistings" });

    // TODO: uncomment once recruiter profile is set up
    var recruiterProfiles = db.collection("recruiterprofiles");
    recruiterProfiles.updateOne({"email": contact_address}, {$push: { "jobsPosted": job_id }});

    try {
        await newJobListing.save();
        res.status(201).json(newJobListing);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}