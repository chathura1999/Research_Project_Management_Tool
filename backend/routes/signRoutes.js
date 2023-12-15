import express from "express";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";
import protect from "../middleware/authMiddleware.js";
import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";

const router = express.Router();

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const { fname, email, password } = req.body;
        const student = await Student.find({ email: email });
        const teacher = await Teacher.find({ email: email });
        const admin = await Admin.find({ email: email });
        if (student.length !== 0) {
            const user = await Admin.create({
                name: fname,
                email: email,
                password: password,
                isAdmin: false,
                role: "STUDENT",
            });
            if (user) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    role: "STUDENT",
                    token: generateToken(user._id),
                });
            } else {
                res.status(401);
                throw new Error("User Creation Unsuccessfull!");
            }
        } else if (teacher.length !== 0) {
            const user = await Admin.create({
                name: fname,
                email: email,
                password: password,
                isAdmin: false,
                role: "TEACHER",
            });
            if (user) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    role: "TEACHER",
                    token: generateToken(user._id),
                });
            } else {
                res.status(401);
                throw new Error("User Creation Unsuccessfull!");
            }
        } else if (admin.length !== 0) {
            res.status(401);
            throw new Error("This Useremail is registered as an Admin , So You Should Know the Password to Log In!");
        } else {
            res.status(401);
            throw new Error("Admin hasn't Created this User!");
        }
    })
);

//get logged in user's profile
//may be this route is for fetching information from the token
//stored in the local storge in our browser which is chrome in my case

router.get(
    "/user",
    protect,
    asyncHandler(async (req, res) => {
        const user = await Admin.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);

export default router;
