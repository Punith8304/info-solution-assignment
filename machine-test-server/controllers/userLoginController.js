import UserModel from "../schemas/UserSchema.js";
import { passwordCheck } from "../services/BcryptServices.js";
import jwt from "jsonwebtoken"


//function to authenticate user using login credentials
export const userLoginController = async (req, res) => {
    const user = req.body.user
    try {

        //if user exists then checking the passwords to match using bcrypt to hashing and comparing 
        const existingUser = await UserModel.find({ email: user.email })
        if (existingUser.length > 0) {
            const passwordCheckResult = await passwordCheck(user.password, existingUser[0].password)
            let userLoginToken = ""
            if (passwordCheckResult.result) {

                //if user entered correct password generating access token and giving expire time for 10 minutes and new access token can be created again using refresh token
                userLoginToken = jwt.sign({ id: existingUser[0]._id, userEmail: user.email }, process.env.SECRET_KEY, { expiresIn: "10m" });


                //creating refresh token giving expiry time 10 days
                const userRefreshToken = jwt.sign({ id: existingUser[0]._id, userEmail: user.email }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "10d" });

                //saving cookie inside our browser
                res.cookie("jwt", userRefreshToken, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                    maxAge: 10 * 24 * 60 * 60 * 1000
                });
            }
            res.send(passwordCheckResult.result ? { login: true, status: 200, accesToken: userLoginToken } : { login: false, status: 401, message: "wrong password", accesToken: userLoginToken })
        } else {
            res.send({ message: "user not found", status: 404, login: false, accesToken: "" })
        }
    } catch (error) {
        console.log(error)
        res.send({ login: false, error: error, message: "try again after some time", status: 408, accesToken: "" })
    }

}



//logout function destroying stored refresh token so client won't be able to authenticate
export const userLogoutController = async (req, res) => {
    res.clearCookie("jwt");
    res.send({status: 200, login: false})
}
