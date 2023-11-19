const Itinerarie = require("../models/itineraries")
const getErrorMessage = require("../helpers/getErrorMessage")

// Create new document
// POST /api
const create = async (req, res) => {
    // Validate with created schema
    const payload = new Itinerarie(req.body)

    // Save item to the DB and send back saved data to FE
    await payload
        .save(payload)
        .then(data => {
            res.send(data)
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

module.exports = create