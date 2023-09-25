import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
        minLength: 8
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User