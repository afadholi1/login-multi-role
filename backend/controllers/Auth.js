import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

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
        const user = await Users.findAll({
            where: { email: req.body.email }
        });
        
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Password Salah"});

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;

        // Masukkan 'name' ke dalam payload token
        const accessToken = jwt.sign({userId, name, email, role}, process.env.ACCESS_TOKEN_SECRET, {
            // expiresIn: '20s' 
            expiresIn: '1d'
        });

        const refreshToken = jwt.sign({userId, name, email, role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await Users.update({refresh_token: refreshToken}, {
            where: { id: userId }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true // Aktifkan jika menggunakan https
        });

        res.json({ accessToken });

    } catch (error) {
        res.status(404).json({msg: "Email tidak ditemukan"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    
    const user = await Users.findAll({
        where: { refresh_token: refreshToken }
    });
    if(!user[0]) return res.sendStatus(204);

    const userId = user[0].id;
    
    await Users.update({refresh_token: null}, {
        where: { id: userId }
    });

    res.clearCookie('refreshToken');
    return res.status(200).json({msg: "Berhasil Logout"});
}

export const Me = async (req, res) => {
    try {
        // Ambil data user berdasarkan ID yang ada di token (hasil verifyToken)
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                // req.userId ini didapat dari middleware verifyToken kamu
                id: req.userId 
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateMe = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                id: req.userId // Diambil dari token
            }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        const { name, email, password, confPassword } = req.body;
        
        let hashPassword;
        if (password === "" || password === null) {
            // Jika password tidak diisi, gunakan password lama
            hashPassword = user.password;
        } else {
            // Jika ganti password, validasi konfirmasi
            if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        await Users.update({
            name: name || user.name,
            email: email || user.email,
            password: hashPassword
        }, {
            where: {
                id: user.id
            }
        });

        res.status(200).json({ msg: "Profil Berhasil Diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}