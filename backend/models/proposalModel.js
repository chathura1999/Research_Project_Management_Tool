import mongoose from "mongoose";
const proposalSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "SUBMITTED FOR APPROVAL",
        },
        file: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);
//the below is required code for converting the schema to the model
//as per the documentation of mongoose
//any name can be given as a constant in the place of the Student
const ProposalSchema = mongoose.model("proposalSchema", proposalSchema);
//NonTeachingStaff variable is exported as follow is a ES module.
export default ProposalSchema;
