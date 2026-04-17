// backend/controllers/Auth.js
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const Register = async(req, res) => {
    const { username, email, password, confPassword, role } = req.body;
    
    // Validasi jika password & konfirmasi password tidak cocok
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    
    // Proses Hashing Password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    
    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword,
            role: role
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: "Email sudah terdaftar atau data tidak valid"});
    }
}