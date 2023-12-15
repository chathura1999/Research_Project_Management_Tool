import mongoose from "mongoose";
const studentSchema = mongoose.Schema(
    {
        student_name: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: true,
        },
        contact_no: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
//the below is required code for converting the schema to the model
//as per the documentation of mongoose
//any name can be given as a constant in the place of the Student
const Student = mongoose.model("Student", studentSchema);
//Student variable is exported as follow is a ES module.
export default Student;
