import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { addBasket, decreaseQuantity, deleteOrder, getBasket, getOrder, increaseQuantity, purchaseBasket, removeFromBasket } from "../controllers/basket.controller.js"

const router = express.Router()

router.post("/add", verifyToken, addBasket)
router.get("/test/:id", getBasket)
router.post("/order", verifyToken, purchaseBasket)
router.delete("/order/delete/:id", verifyToken, deleteOrder)
router.post("/order/increase", verifyToken, increaseQuantity)
router.post("/order/decrease", verifyToken, decreaseQuantity)
router.get("/order/:id", verifyToken, getOrder)
router.delete("/delete/:id", verifyToken, removeFromBasket)
export default router;