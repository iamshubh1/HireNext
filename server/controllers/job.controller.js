import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title){
            return res.status(400).json({
                message: "Title is required.",
                success: false
            })
        };
        if (!description){
            return res.status(400).json({
                message: "Description is required.",
                success: false
            })
        };
        if (!requirements){
            return res.status(400).json({
                message: "Requirements are required.",
                success: false
            })
        };
        if (!salary){
            return res.status(400).json({
                message: "Salary is required.",
                success: false
            })
        };
        if (!location){
            return res.status(400).json({
                message: "Location is required.",
                success: false
            })
        };
        if (!jobType){
            return res.status(400).json({
                message: "Job type is required.",
                success: false
            })
        };
        if (!experience){
            return res.status(400).json({
                message: "Experience is required.",
                success: false
            })
        };
        if (!position){
            return res.status(400).json({
                message: "Position is required.",
                success: false
            })
        };
        if (!companyId){
            return res.status(400).json({
                message: "Company ID is required.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
