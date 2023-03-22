import mongoose from "mongoose";

interface Book {
    title: string;
    author: string;
    genre: string;
    description: string;
    image: string;
    text: string;
    userID: mongoose.Types.ObjectId;
}

const Schema = mongoose.Schema;

const BookSchema = new Schema<Book>({
    title: { 
        type: String, 
        required: true 
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

export default Book;