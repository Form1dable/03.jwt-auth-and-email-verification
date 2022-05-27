import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            min: 3,
            max: 20,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
            min: 3,
            max: 20,
        },
        lastName: {
            type: String,
            trim: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: [true, "Please enter an Email Address"],
            unique: true,
            trim: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 3,
        },
        verified: {
            type: String,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
