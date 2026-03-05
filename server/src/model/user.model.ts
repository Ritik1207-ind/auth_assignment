import mongoose, { Model } from "mongoose"

export interface Tuser {
    _id?: string
    fullname: string
    email: string,
    password: string
    createdAt?: Date
    updatedAt?: Date
}

const userSchema = new mongoose.Schema<Tuser>({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User: Model<Tuser> =
    mongoose.models.User || mongoose.model<Tuser>("User", userSchema);
export default User;