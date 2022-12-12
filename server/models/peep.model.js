import mongoose from "mongoose";

const peepSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    peepMessage: { type: String, required: true }
});

const Peep = mongoose.model(`Peep`, peepSchema);

export default Peep;