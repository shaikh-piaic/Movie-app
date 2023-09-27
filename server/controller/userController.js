import User from "../model/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()
const secretKey = process.env.JWT_TOKEN || 'your-secret-key';

export const Signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.json({ message: 'Please provide both username and password.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });

        await newUser.save()
        res.json({ message: 'User created successfully.' });
    } catch (error) {

        res.json({ message: 'Error while creating the user.' });
    }

}

export const Login = async (req, res) => {
    const { username, password } = req.body;

    const isUser = await User.findOne({ username })
    if (!isUser) {
        return res.json({ message: 'Invalid username or password.' });
    } else {
        const validPassword = await bcrypt.compare(password, isUser.password);
        if (!validPassword) {
            return res.json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ username: isUser.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    }
}
