import express from 'express';
import mongoose from 'mongoose'
import Project from '../models/Project';
import { v4 as uuid } from 'uuid';

// mongoose.connect(process.env.MONGO_URI);
// const db = mongoose.connection;
const uploadProjectRoute = (router, JobseekerProfile) => {
    router.post("/postproject", [verifyUser], (req, res) => {
        export const uploadProject = async (req, res, db) => {
            const { descrip, collStat, numColls, myStack, repoLink } = req.body;
            let currUser = res.locals.authData;

            const userId = currUser.email;
            const projectId = uuid();
            const description = descrip;
            const date = new Date().toISOString().slice(0, 10);
            const userId = `${currUser.firstName} ${currUser.lastName}`;
            const collaborationStatus = collStat;
            const numCollaborators = numColls;
            const stack = myStack.split(','); // split the comma separated stack into array
            const projectLink = repoLink;
            const newProjectPost = new Project({ userId, projectId, description, date, collaborationStatus, numCollaborators, stack, projectLink }, { collection: "projects" });


            try {
                await newProjectPost.save();
                res.status(201).json(newProjectPost);
            } catch (error) {
                res.status(409).json({ message: error.message });
            }

        };
    });
};

module.exports = uploadProjectRoute;