import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function loginHandler(req, res) {
    if (!req.body.email) {
        res.status(400).json({
            message: "Email is required."
        })
    } else if (!req.body.password) {
        res.status(400).json({
            message: "Password is required."
        })
    } else {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({
                message: "User with this email does not exist"
            })
        } else if (user.password !== password) {
            res.status(401).json({
                message: "Password is incorrect."
            });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.cookie('token', token);
            res.json({ message: "Logged in Sucessfully." });
        }
    }
}

async function registerHandler(req, res) {
    if (!req.body.email) {
        res.status(401).json({
            message: "Email is required."
        })
    } else if (!req.body.password) {
        res.status(401).json({
            message: "Password is required."
        })
    } else {
        const email = req.body.email;
        const password = req.body.password;

        const newUser = new User({
            email,
            password
        });

        try {
            await newUser.save();
            res.json({ message: "Registered Successfully." });
        } catch (e) {
            res.status(500).json({ message: `Exception occured while creating user: ${e}` });
        }
    }
}

async function userDetails(req, res) {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(404).json({
            message: "No such user exists."
        });
        return;
    }
    const email = user.email;
    res.status(200).json({ message: `User with email: ${email} logged in.` });
}

export { loginHandler, registerHandler, userDetails };