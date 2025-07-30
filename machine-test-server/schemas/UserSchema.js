import mongoose from "mongoose"

//user schema to create new user
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})


//user model with collection name users
const UserModel = mongoose.model("users", userSchema)

export default UserModel;