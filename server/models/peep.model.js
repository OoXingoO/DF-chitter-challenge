import mongoose from "mongoose";

const peepSchema = new mongoose.Schema({
    username: { type: String, required: true },
    peepMessage: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Peep = new mongoose.model(`Peep`, peepSchema);