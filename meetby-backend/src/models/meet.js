const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MeetSchema = Schema({
    title: String,
    duration: {
        type: String,
        required: true,
        trim: true,
        validate: [ // Regular expression for ISO 8601 durations
            (val) => /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/.test(val),
        ]
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    place: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    meetingUrl: {
        type: String,
        required: false,
        validate: [ // It must be a valid URL
            (val) => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(val),
        ]
    },
    proposedAvailabilities: [
        {
            availability: {
                type: String,
                validate: [ // Regular expression for ISO 8601 intervals
                    (val) => /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/.test(val),
                ],
            },
            availableUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            availableGuests: [{ 
                type: String,
                validate: [ // Regular expression for emails
                    (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
                ]
            }]
        }
    ],
    invitedUsers: [ {type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
    invitedGuests: [ 
        { 
            type: String,
            validate: [ // Regular expression for emails
                (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
            ]
        }
    ],
    creationDate: Date,
    plannedDateTime: {
        type: Date,
        required: false,
    }
})

module.exports = mongoose.model("Meet", MeetSchema, "meets")
