import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    genre: {
        type: String,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Movies = mongoose.model("Movies", movieSchema)
export default Movies