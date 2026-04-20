// backend/controllers/Auth.js
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  // Validasi jika password & konfirmasi password tidak cocok
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  // Proses Hashing Password
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "Email sudah terdaftar atau data tidak valid" });
  }
};

export const Login = async(req, res) => {
    try {
        // 1. Cek apakah email ada
        const user = await Users.findAll({
            where: { email: req.body.email }
        });
        
        // 2. Bandingkan password
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Password Salah"});

        // 3. Jika cocok, ambil data user
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const role = user[0].role;

        // 4. Buat Access Token (Cepat hangus)
        const accessToken = jwt.sign({userId, username, email, role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s' 
        });

        // 5. Buat Refresh Token (Awet)
        const refreshToken = jwt.sign({userId, username, email, role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        // 6. Simpan Refresh Token ke Database
        await Users.update({refresh_token: refreshToken}, {
            where: { id: userId }
        });

        // 7. Kirim Refresh Token lewat HttpOnly Cookie (Sangat Aman)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 hari
        });

        // 8. Kirim Access Token ke Frontend
        res.json({ accessToken });

    } catch (error) {
        res.status(404).json({msg: "Email tidak ditemukan"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204); // No content
    
    const user = await Users.findAll({
        where: { refresh_token: refreshToken }
    });
    if(!user[0]) return res.sendStatus(204);

    const userId = user[0].id;
    
    // 1. Hapus refresh_token di database
    await Users.update({refresh_token: null}, {
        where: { id: userId }
    });

    // 2. Hapus cookie di browser
    res.clearCookie('refreshToken');
    return res.status(200).json({msg: "Berhasil Logout"});
}