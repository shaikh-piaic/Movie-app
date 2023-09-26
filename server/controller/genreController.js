import Genre from "../model/genre.js"

export const getGenre = async (req, res) => {
    try {
        const genre = await Genre.find().exec()
        res.json({
            genre,
            total: genre.length
        })
    } catch (error) {
        res.json({
            error: error.message
        })
    }
}

export const postGenre = async (req, res) => {
    try {
        const { title } = req.body
        const isGenreExisting = await Genre.findOne({ title })
        if (isGenreExisting) {
            return res.json({ message: "Genre Already Exists" })
        }
        let newGenre = new Genre({
            title
        })
        await newGenre.save()

        res.json({
            message: "Genre Added Successfully"
        })
    } catch (error) {
        res.json({
            error: "Failed to Add Genre",
            message: error.message,
        })
    }
}

export const deleteGenre = async (req, res) => {
    try {
        await Genre.findByIdAndDelete(req.params.genreId)

        res.json({
            message: "Genre Deleted Successfully",
            // updatedMovie: isMovieExisting
        })
    } catch (error) {
        res.json({
            error: "Failed to Delete the Genre",
            message: error.message,
        })
    }
}

