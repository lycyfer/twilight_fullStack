

import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js"
import { addCreditCard, getCreditCard, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.put("/:id", verifyToken, updateUser)
router.post("/card/:id", verifyToken, addCreditCard)
router.get("/card/my/:id", verifyToken, getCreditCard)

export default router;