import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import movies from "./routes/movies.js"
import genre from "./routes/genre.js"
const app = express()
config();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = 1000 || process.env.PORT
const dbCon = process.env.DB
connect(dbCon)
    .then((result) => {
        app.listen(port, () => {
            console.log(
                `Server Has Been Started on ${port} & DB is Connected Successfully`
            );
        });
    })
    .catch((err) => {
        console.log(`DB Connection Error ${err}`);
    });


app.use("/api", movies)
app.use("/api", genre)