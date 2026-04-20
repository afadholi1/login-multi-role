import express from "express";
import { Register, Login, Logout } from "../controllers/Auth.js";
import { refreshToken } from "../controllers/RefreshToken.js"; 
import { getUsers, updateUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Route /users SEKARANG DIPROTEKSI oleh verifyToken
router.get('/users', verifyToken, getUsers);
router.patch('/users/:id', verifyToken, updateUser);

router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken); // Gunakan GET untuk mengambil token baru
router.delete('/logout', Logout);

export default router;