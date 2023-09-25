import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";

const app = express()
config();
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