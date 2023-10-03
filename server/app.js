import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors"
import movies from "./routes/movies.js"
import genre from "./routes/genre.js"
import user from "./routes/user.js"
const app = express()
config();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors({ origin: true, credentials: true }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})
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
app.use("/api", user)