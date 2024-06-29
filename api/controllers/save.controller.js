import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const savedProduct = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const existingSavedProduct = await prisma.savedProduct.findUnique({
            where: {
                productId,
            },
        });
        console.log(existingSavedProduct)
        if (existingSavedProduct) {
            await prisma.savedProduct.delete({
                where: {
                    id: existingSavedProduct.id,
                },
            });
            return res.status(200).json({ message: 'Товар удален из сохраненного списка' });
        } else {
            const newSavedProduct = await prisma.savedProduct.create({
                data: {
                    user: { connect: { id: userId } },
                    product: { connect: { id: productId } },
                },
            });

            await prisma.product.update({
                where: { id: productId },
                data: {
                    savedProduct: {
                        connect: { id: newSavedProduct.id },
                    },
                },
            });

            return res.status(200).json({ message: 'Товар сохранен', savedProduct: newSavedProduct });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Произошла ошибка' });
    }
};
export const getSavedProducts = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const savedProducts = await prisma.savedProduct.findMany({
            where: { userId: id },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        images: true,
                        description: true,
                    },
                },
            },
        });
        console.log(savedProducts)
        if (savedProducts) {
            res.status(200).json(savedProducts);
        } else {
            res.status(404).json({ message: 'Сохраненные продукты не найдены' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка' });
    }
};
