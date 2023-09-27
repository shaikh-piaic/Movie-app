import express from "express";
import { Signup, Login } from "../controller/userController.js";

const router = express.Router()

router.post("/users/signup", Signup)
router.post("/users/login", Login)

export default router