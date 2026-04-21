import Users from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['uuid', 'name', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Terjadi kesalahan pada server"});
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { uuid: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const { name, email, role, password, confPassword } = req.body;

    // Logika Password: Jika user tidak mengisi password, pakai yang lama
    let hashPassword = user.password;
    if (password && password !== "") {
      if (password !== confPassword) {
        return res.status(400).json({ msg: "Password tidak cocok" });
      }
      // Gunakan library hashing kamu (contoh argon2/bcrypt)
      // const salt = await argon2.genSalt();
      // hashPassword = await argon2.hash(password, salt);
    }

    await Users.update(
      { name, email, role, password: hashPassword }, 
      { where: { id: user.id } }
    );
    
    res.status(200).json({ msg: "User Berhasil Diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const deleteUser = async(req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User Berhasil Dihapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}