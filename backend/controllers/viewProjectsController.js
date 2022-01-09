import express from 'express';
import mongoose from 'mongoose'
import Project from '../models/Project';

const uploadResumeRoute = (router, JobseekerProfile) => {
    router.get(`/viewprojects`, (req, res) => {
        Project.find().then(ret => {
          res.json(ret);
        });
      });
};

module.exports = uploadResumeRoute;