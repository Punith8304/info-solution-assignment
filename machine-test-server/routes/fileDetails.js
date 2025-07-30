import express from "express"
import { agentTaskUpload } from "../controllers/agentController.js"
import multer from "multer"

const router = express.Router()


//usign multer for storing files temporarily in uploads folder
const upload = multer({
    dest: 'uploads/'
})



//verify middleware to check user validity
const verify = async (req, res, next) => {
    const accessToken = req.cookies.jwt
    if (accessToken) {
        next()
    } else {
        res.status(403).json({ message: "Not logged in", logout: true, fileUpload: false })
    }
}



//post request to store uploaded files and handle it 
router.post("/upload", upload.single('file'), verify, agentTaskUpload)




export default router