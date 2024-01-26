const mongoose = require("mongoose")

const Schema = mongoose.Schema

const NotificationSchema = Schema({
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    meetId: { type: mongoose.Schema.Types.ObjectId, ref: "Meet" },
    date: Date,
    type: String,
    data: {},
    readers: { 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        validate: [
            (value) => value.every(reader => this.recipients.includes(reader))
        ]
    },
})

module.exports = mongoose.model("Notification", NotificationSchema, "notifications")