import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // Mengambil token dari header Authorization atau Cookie
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Jika kamu menggunakan Cookie (seperti yang kita set sebelumnya)
    const cookieToken = req.cookies.refreshToken; 

    // Kita cek tokennya (disini kita pakai yang dari cookie/header sesuai settinganmu)
    if(cookieToken == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(cookieToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403); // Forbidden
        req.email = decoded.email;
        req.userId = decoded.userId;
        next(); // Lanjut ke fungsi berikutnya (getUsers)
    });
}