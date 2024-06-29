
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { savedProduct: true }
        });
        console.log(products)
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get products" });
    }
};

export const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { savedProduct: true }

        });
        console.log(product)
        const token = req.cookies?.token;
        let isSaved = false;

        if (token) {
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const saved = await prisma.savedProduct.findUnique({
                    where: {
                        userId: decodedToken.id,
                        productId: id,
                    },
                });
                isSaved = !!saved;
                console.log(product)
            } catch (error) {
                console.error(error);
            }
        }
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post" });
    }
};

export const addProduct = async (req, res) => {
    const body = req.body;

    try {
        const newProduct = await prisma.product.create({
            data: {
                ...body.productData,
            },
        });
        console.log(newProduct)
        res.status(200).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create post" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update product" });
    }
};


export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized!" });
        }

        await prisma.post.delete({
            where: { id },
        });

        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete post" });
    }
};