import express from "express";
import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import capitalize from "../config/capitalize.js";
import NepaliDate from "nepali-date-converter";
import StudentFees from "../models/studentFeesModel.js";
import protect from "../middleware/authMiddleware.js";
import StudentAttendance from "../models/studentAttendanceModel.js";
import Dashboard from "../models/dashboardModel.js";
const router = express.Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const students = await Student.find({});
        console.log(students);
        res.json(students);
    })
);
router.get(
    "/class/:id",
    asyncHandler(async (req, res) => {
        const students = await Student.find({ classname: req.params.id });
        if (students.length > 0) {
            console.log(students);

            res.json(students);
        } else {
            res.status(404).json({ message: "No students found." });
        }
    })
);
// the following route is for loading attendance and students info.
router.get(
    "/class/:id/attendance",
    asyncHandler(async (req, res) => {
        const students = await StudentAttendance.findOne({
            attendance_date: new NepaliDate().format("YYYY-MM-D"),
            classname: req.params.id,
        });
        // console.log("students",students.length())
        if (students) {
            console.log(students);

            res.json(students);
        } else {
            res.status(404).json({ message: "No students found." });
        }
    })
);

//following route is for searching the students with the given name ,class and roll no
router.get(
    "/search/:name/:class/:roll_no",
    asyncHandler(async (req, res) => {
        console.log(req.params.name, req.params.class, req.params.roll_no);
        const student = await Student.findOne({
            student_name: capitalize(req.params.name),
            classname: capitalize(req.params.class),
            roll_no: parseInt(req.params.roll_no),
        });
        console.log(student);

        if (student) {
            res.json(student);
        } else {
            res.status(404);
            res.json({ message: "No student found with the given information." });
        }
    })
);

//following route is for registering the students

router.post(
    "/register",
    //the protect used here is used for getting the id of the admin who registered the student

    protect,
    asyncHandler(async (req, res) => {
        const {
            student_name,
            address,

            contact_no,
            gender,

            age,
            email,
        } = req.body;
        console.log({
            student_name,
            address,

            contact_no,
            gender,

            age,
            email,
        });
        // const student_info =
        const new_student = await Student.create({
            student_name,
            email,
            address,
            gender,
            contact_no,
            age,
        });
        console.log(new_student);
        if (new_student) {
            console.log("Triggered!");
            res.status(201).json({
                message: "Student registered successfully",
            });
            console.log("registered successfully");
        } else {
            res.status(400);
            console.log(error);
            throw new Error("Unable to register the Student");
        }
    })
);
router.put(
    "/update",
    asyncHandler(async (req, res) => {
        console.log(req.body);
        const student = await Student.findById(req.body._id);
        console.log('Found Student', student);
        //TODO: Change to student fields (with the name in database) start
        student.student_name = req.body.student_name;
        student.student_address = req.body.address;
        student.student_contact_no = req.body.contact_no;
        student.student_gender = req.body.gender;
        student.student_age = req.body.age;
        student.student_email = req.body.email;
        //TODO: Change to student fields (with the name in database) end
        const final = await student.save();
        console.log(final);
        res.status(201).json({
            message: "Student updated successfully",
        });
        console.log("updated successfully");
    })
);

//following route is for paying the fees of students

//following route is for attendance of students
router.post(
    "/attendance/:classname",
    protect,
    asyncHandler(async (req, res) => {
        // const students = await Student.find({})
        const { students } = req.body;
        console.log(req.body);
        const class_teacher = req.user.name;
        // console.log(req.params.classname)
        const attendanceFound = await StudentAttendance.findOne({
            attendance_date: new NepaliDate().format("YYYY-MM-D"),
            classname: req.params.classname,
        });
        console.log(attendanceFound);
        if (attendanceFound) {
            await StudentAttendance.updateOne({ _id: attendanceFound._id }, { $set: { students: students } });
            console.log("done with re-attendance");
            res.status(201).json({ message: "Attendance retaken successfully" });
        } else {
            const new_attendance = await StudentAttendance.create({
                class_teacher,
                classname: req.params.classname,
                attendance_date: new NepaliDate().format("YYYY-MM-D"),
                students,
            });
            console.log(new_attendance);
            if (new_attendance) {
                res.status(201).json({
                    message: "Attendance taken successfully",
                });
            } else {
                res.status(400);
                console.log(error);
                throw new Error("Unable to take attendance");
            }
        }
    })
);

//following route is for admit card of the student

//following route is for deleting the student
router.delete(
    "/delete/:id",
    asyncHandler(async (req, res) => {
        const student = await Student.findById(req.params.id);
        if (student) {
            await student.remove();
            const total_students = (await Student.find()).length;
            await Dashboard.findOneAndUpdate({ title: "Students" }, { number: total_students });
            res.json({ message: "Student removed" });
        } else {
            res.status(404);
            throw new Error("student not found");
        }
    })
);


export default router;
