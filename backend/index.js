import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import Users from "./models/UserModel.js";
import UserRoute from "./routes/UserRoute.js"; 

dotenv.config();
const app = express();

// Test Koneksi Database
(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');

        // Baris ini yang akan membuat tabel otomatis jika belum ada
        await db.sync(); 
        console.log('Database Synced...');
    } catch (error) {
        console.error('Connection error:', error);
    }
})();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(UserRoute); // Letakkan di atas app.listen

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});