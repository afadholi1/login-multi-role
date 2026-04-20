import express from "express";
import { Register, Login, Logout, Me } from "../controllers/Auth.js"; // Tambahkan 'Me'
import { refreshToken } from "../controllers/RefreshToken.js"; 
import { getUsers, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// --- PUBLIC ROUTES ---
router.post('/login', Login);
router.post('/users', Register); 
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// --- PROTECTED ROUTES (Butuh Login) ---
router.get('/me', verifyToken, Me); // Untuk ambil data profil sendiri
router.get('/users', verifyToken, getUsers);
router.patch('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;