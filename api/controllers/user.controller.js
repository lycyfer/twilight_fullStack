import bcrypt from "bcrypt";
import crypto from 'crypto';
import prisma from "../lib/prisma.js";
import CryptoJS from 'crypto-js';


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
    }

    let updatedPassword = null;
    try {
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            },
        });

        const { password: userPassword, ...rest } = updatedUser;

        res.status(200).json(rest);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update users!" });
    }
};

export const addCreditCard = async (req, res) => {
    const userId = req.params.id;
    const tokenUserId = req.userId;
    const { cardNumber, cardHolderName, expirationMonth, expirationYear, cvv } = req.body;
    console.log(userId, tokenUserId, cardNumber, cardHolderName, cardHolderName)

    if (userId !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
    }

    try {

        const existingCard = await prisma.creditCard.findUnique({
            where: { userId },
        });

        if (existingCard) {
            return res.status(400).json({ message: "User already has a credit card!" });
        }


        const hashedCardNumber = await bcrypt.hash(cardNumber, 10);
        const hashedCvv = await bcrypt.hash(cvv, 10);


        const newCreditCard = await prisma.creditCard.create({
            data: {
                userId,
                cardNumber: hashedCardNumber,
                cardHolderName,
                expirationMonth,
                expirationYear,
                cvv: hashedCvv,
            },
        });

        res.status(201).json(newCreditCard);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add credit card!" });
    }
};

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Ваш ключ для шифрования
const iv = crypto.randomBytes(16); // Ваш IV для шифрования

// Функция для расшифровки номера карты с использованием PKCS#7 padding
async function decryptCardNumber(encryptedCardNumber) {
    // Расшифровываем данные с использованием PKCS#7 padding
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAutoPadding(false); // Отключаем автоматический паддинг
    let decrypted = decipher.update(encryptedCardNumber, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Удаляем PKCS#7 padding
    const paddingSize = decrypted.charCodeAt(decrypted.length - 1);
    decrypted = decrypted.slice(0, -paddingSize);

    return decrypted;
}

function getLastFourDigits(cardNumber) {
    return cardNumber.slice(-4);
}

export const getCreditCard = async (req, res) => {
    const userId = req.params.id;
    const tokenUserId = req.userId;

    try {
        const creditCard = await prisma.creditCard.findUnique({
            where: { userId },
        });

        if (!creditCard) {
            return res.status(404).json({ message: "Credit card not found!" });
        }

        const decryptedCardNumber = await decryptCardNumber(creditCard.cardNumber);
        const lastFourDigits = getLastFourDigits(decryptedCardNumber);
        console.log(creditCard)
        res.status(200).json(creditCard);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get credit card!" });
    }
};