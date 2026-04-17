import express from "express";
import { Register } from "../controllers/Auth.js";

const router = express.Router();

router.post('/users', Register);

export default router;