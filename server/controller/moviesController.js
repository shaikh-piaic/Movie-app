import Movies from "../model/movie.js"

export const getMovies = async (req, res) => {
    try {
        const movies = await Movies.find().exec()
        res.status(200).json({
            movies,
            total: movies.length
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

export const postMovies = async (req, res) => {
    try {
        const { title, description, image, rating, genre, runtime } = req.body
        const isMovieExisting = await Movies.findOne({ title })
        if (isMovieExisting) {
            return res.json({ message: "Movie Already Exists" })
        }
        let newMovie = new Movies({
            title, description, image, rating, genre, runtime
        })
        await newMovie.save()

        res.json({
            message: "Movie Added Successfully"
        })
    } catch (error) {
        res.json({
            error: "Failed to Add Movie",
            message: error.message,
        })
    }
}
export const putMovies = async (req, res) => {
    try {
        const { title, description, image, rating, genre, runtime } = req.body
        const isMovieExisting = await Movies.findByIdAndUpdate({ _id: req.params.movieId }, req.body, { new: true })

        res.json({
            message: "Movie Updated Successfully",
            updatedMovie: isMovieExisting
        })
    } catch (error) {
        res.json({
            error: "Failed to Update the Movie",
            message: error.message,
        })
    }
}
export const deleteMovies = async (req, res) => {
    try {
        await Movies.findByIdAndDelete(req.params.movieId)

        res.json({
            message: "Movie Deleted Successfully",
            // updatedMovie: isMovieExisting
        })
    } catch (error) {
        res.json({
            error: "Failed to Delete the Movie",
            message: error.message,
        })
    }
}

