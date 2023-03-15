import mongoose from 'mongoose';

interface User {
    username: string;
    password: string;
    passwordConfirm: string;
    email: string;
    avatar?: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    passwordConfirm: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;