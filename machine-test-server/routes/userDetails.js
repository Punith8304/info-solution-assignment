import express from 'express'
import { userLoginController, userLogoutController } from '../controllers/userLoginController.js'
import { userAuthenticationController } from '../controllers/UserAuthenticationController.js'

const router = express.Router()



//user login post request
router.post("/login", userLoginController)

//user authentication
router.post("/authenticate", userAuthenticationController)

//user logout request
router.get("/logout", userLogoutController)

export default router