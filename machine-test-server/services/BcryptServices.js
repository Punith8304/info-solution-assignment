import bcrypt, { hash } from "bcrypt"



//bcrypt for hashing the password
export const passwordCheck = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash)
        return { result: result }
    } catch (error) {
        return { error: error, result: false }
    }
}


//bcrypt for comparing the stored password hashes with user entered password
export const createHash = async (password) => {
    try {
        const result = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        return { result: true, hash: result }
    } catch (error) {
        return {error, result: false}
    }
}