import express from "express"
import { register, login, logout, updateUserRole } from "../controllers/auth.controller.js"

const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/admin", updateUserRole)

export default router;