import mongoose from "mongoose"



//agent schema for mongoDB with fields fullName email, mobile, hashed password, tasks array
const AgentSchema = new mongoose.Schema({
    fullName: String,
    email: {
        unique: true,
        type: String
    },
    mobile: String,
    password: String,
    tasks: [{
        FirstName: String,
        Phone: String,
        Notes: String
    }]
})


//mongoose model with collection name agents
const AgentModel = mongoose.model("agents", AgentSchema)

export default AgentModel;