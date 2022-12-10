import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please supply your name`]
    },
    username: {
        type: String,
        required: [true, `Please provide a username`],
        unique: [true, `Username already in use`],
        trim: true
    },
    email: {
        type: String,
        required: [true, `Please enter your email address`],
        unique: [true, `Email already registered`],
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: [true, `Please enter a password]`]
    }
});

const User = mongoose.model(`User`, userSchema);

export default User;