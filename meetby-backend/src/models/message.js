const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MessageSchema = Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    meetId: { type: mongoose.Schema.Types.ObjectId, ref: "Meet" },
    date: Date,
    message: String,

})

module.exports = mongoose.model("Message", MessageSchema, "messages")