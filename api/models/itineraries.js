const mongoose = require("mongoose")
const { Schema, model } = mongoose

// mongodb schema, model
const itinerarieSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: [100, "The title is too long!"],
    },
    description: {
        type: String,
        required: true,
        maxLength: [1000, "The description is too long!"]
    },
    route: {
        type: [String],
        validate: {
            validator: function(value) {
                return Array.isArray(value) && value.length
            }, 
            message: "Route can't be empty!"
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Itinerarie = model("Itinerarie", itinerarieSchema)

module.exports = Itinerarie