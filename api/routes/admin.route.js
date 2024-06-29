import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { allOrders, getOrder, getUsers } from "../controllers/admin.controller.js"

const router = express.Router()


router.get("/users", verifyToken, getUsers)
router.get("/order/purchases", verifyToken, allOrders)

export default router;