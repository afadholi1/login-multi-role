import Users from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id', 'name', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Terjadi kesalahan pada server"});
    }
}


export const updateUser = async(req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id // 'id' di sini harus sama dengan ':id' di router
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

        const { name, email, role } = req.body;
        
        await Users.update({ name, email, role }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User Berhasil Diupdate"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}