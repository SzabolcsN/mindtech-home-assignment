const Itinerarie = require("../models/itineraries")

// Return all not deleted documents
// GET /api
const findAll = (req, res) => {
    let params = { isDeleted: false }
    // Add regex for title search
    // if the search value is contained within any existing title
    if (req?.query?.title) {
        params.title = { $regex: new RegExp(req.query.title, "i") }
    }

    Itinerarie.find(params)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            })
        })
}

module.exports = findAll