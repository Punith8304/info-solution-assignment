import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()


//route fetching and using to simplify endpoints
import userDetails from "./routes/userDetails.js"
import fileDetails from "./routes/fileDetails.js"
import connectMongoDB from "./config/MongoDBConfig.js"
import agentDetails from "./routes/agentDetails.js"



//connecting to mongoDB database
connectMongoDB().catch(error => { console.log(error) }).then(() => { console.log("connected db") })


const app = express()


//using cors to allow cross origin resource sharing
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}))


//allows us to parse body of the request
app.use(express.json())


//cookie parser to use cookies
app.use(cookieParser())


//paths for the request
app.use("/user", userDetails)
app.use("/file", fileDetails)
app.use("/agent", agentDetails)


//server listening on port 8000
app.listen(8000, (req, res) => {
    console.log(`Server running on port ${process.env.PORT}`)
})