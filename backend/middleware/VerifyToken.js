import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // 1. Ambil Access Token dari Header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Jika token tidak ada di header, tolak akses
    if(token == null) return res.sendStatus(401); 

    // 3. Verifikasi menggunakan ACCESS_TOKEN_SECRET (Bukan Refresh)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403); 
        
        // Simpan data ke request agar bisa dipakai di controller (seperti Me atau Update)
        req.email = decoded.email;
        req.userId = decoded.userId;
        req.role = decoded.role; 
        
        next(); 
    });
}