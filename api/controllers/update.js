const Itinerarie = require("../models/itineraries")
const getErrorMessage = require("../helpers/getErrorMessage")
const convertToObjectId = require("../helpers/convertToObjectId")

// Update a document
// PUT /api 
const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "The data to be updated cannot be empty"
        })
    }

    const id = convertToObjectId(req.params.id)

    // Find document and update (if not deleted)
    // Send back updated record to the FE
    Itinerarie.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { runValidators: true, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "The itinerarie not found"
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            if (err?.name === "ValidationError") {
                const message = getErrorMessage(err.errors)
                return res.status(400).send({ message: message || "Something went wrong" })
            }
            res.status(500).send({
                message: "Something went wrong!"
            })
        })
}

module.exports = update