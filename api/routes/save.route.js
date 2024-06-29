import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { getSavedProducts, savedProduct } from "../controllers/save.controller.js"

const router = express.Router()

router.post("/save", verifyToken, savedProduct)
router.get("/:id/saved-products", verifyToken, getSavedProducts);

export default router;