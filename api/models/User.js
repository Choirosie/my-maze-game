import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        story: {
            type: String,
        },
        item: {
            type:[String],
        },
        teammate: {
            type:[String],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestapms: true}
);

export default mongoose.model("User", UserSchema);
