import mongoose from "mongoose"


//mongodb config
async function connectMongoDB() {
    await mongoose.connect(process.env.MONGODB_URL)
}

export default connectMongoDB;