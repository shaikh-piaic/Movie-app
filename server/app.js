const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose");

const app = express()
dotenv.config();
const port = 1000 || process.env.PORT
const dbCon = process.env.DB
mongoose
    .connect(dbCon)
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