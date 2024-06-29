import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { addProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js"

const router = express.Router()

router.get("/", verifyToken, getProducts)
router.get("/:id", verifyToken, getProduct)
router.put("/:id", verifyToken, updateProduct)
router.post("/", verifyToken, addProduct)

export default router