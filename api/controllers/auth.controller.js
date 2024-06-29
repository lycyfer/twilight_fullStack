import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email,
                password: hashedPassword,
            },
        });

        console.log(newUser);

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const age = 1000 * 60 * 60 * 24 * 7;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: false,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const {
            password: userPassword, ...userInfo
        } = user

        res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: age,
            })
            .status(200)
            .json(userInfo)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "logout success" });
};


export const updateUserRole = async (req, res) => {
    const { email } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                role: 'ADMIN'
            }
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User role updated successfully", user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};