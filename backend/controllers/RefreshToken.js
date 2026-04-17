import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    // 1. Ambil cookie bernama refreshToken
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    // 2. Cek apakah token tersebut ada di database
    const user = await Users.findAll({
      where: { refresh_token: refreshToken },
    });
    if (!user[0]) return res.sendStatus(403);

    // 3. Verifikasi tokennya
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        // 4. Jika valid, buat Access Token baru
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const role = user[0].role;

        const accessToken = jwt.sign(
          { userId, username, email, role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "20s",
          },
        );

        // 5. Kirim ke Frontend
        res.json({ accessToken });
      },
    );
  } catch (error) {
    console.log(error);
  }
};
