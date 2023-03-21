import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import Book from '../models/Book';

interface User {
    username: string;
    password: string;
    email: string;
    avatar?: string;
    books?: Array<object>
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
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
    password: { type: String, required: true },
    avatar: { type: String },
    books: [{ 
        type: Schema.Types.ObjectId, ref: 'Book' 
    }],
});

// Pre save encryption salts/hashes user passwords
UserSchema.pre('save', function(next) {
    const user = this;

    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, (hashError, hash) => {
                    if (hashError) {
                        return next(hashError);
                    }

                    user.password = hash;
                    next();
                })
            }
        })
    } else {
        return next();
    }
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;