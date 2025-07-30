import express from "express"
import { createAgent, getAgents } from "../controllers/agentController.js"


const router = express.Router()

//verify middleware to check whether the user is valid user or not
const verify = async (req, res, next) => {
    const accessToken = req.cookies.jwt
    if (accessToken) {
        next()
    } else {
        res.status(403).json({ message: "Not logged in", logout: true, fileUpload: false })
    }
}

//creating agent and getting all agents
router.post("/create-agent", verify, createAgent)
router.get("/get-agents", verify, getAgents)


export default router
