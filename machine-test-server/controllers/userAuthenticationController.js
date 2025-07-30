import jwt from "jsonwebtoken"
import UserModel from "../schemas/UserSchema.js";



//user authentication for every login 
export const userAuthenticationController = async (req, res) => {
    const accessToken = req.body.accesstoken;
    const refreshToken = req.cookies.jwt
    if (refreshToken) {
        try {
            const decodedToken = jwt.verify(accessToken, process.env.SECRET_KEY)
            const user = await UserModel.find({ _id: decodedToken.id })
            if (user.length > 0) {
                res.send({ login: true, status: 200 })
            } else {
                res.send({ login: false, status: 401 })
            }
        } catch (error) {
            try {

                //using refresh token and checking authentication to provide a new access token
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
                const user = await UserModel.find({ _id: decodedRefreshToken.id })
                if (user.length > 0) {

                    //if user exists creating new accesstoken as the previous token expired
                    const newAccesstoken = jwt.sign({ id: user[0]._id, userEmail: user.email }, process.env.SECRET_KEY, { expiresIn: "20m" });


                    res.send({ login: true, status: 200, accesToken: newAccesstoken })
                } else {
                    res.send({ message: "Error try again after some time", status: 404, login: false })
                }
            } catch (error) {
                console.log(error)
                res.send({ login: false, error: error, message: "try again after some time", status: 408 })
            }
        }
    } else {
        res.send({ login: false, status: 401 })
    }
}