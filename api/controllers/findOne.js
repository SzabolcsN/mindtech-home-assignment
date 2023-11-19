const Itinerarie = require("../models/itineraries")
const convertToObjectId = require("../helpers/convertToObjectId")

// Find one document by _id
// GET /api/:id
const findOne = (req, res) => {
  let id = req.params.id

  if (!id) {
    return res.status(400).send("Something went wrong")
  }

  id = convertToObjectId(id)

  // Search by _id - if not soft deleted
  Itinerarie.findOne({ _id: id, isDeleted: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "The itinerarie not found" })
      }
      else {
        res.send(data)
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Something went wrong"})
    })
}

module.exports = findOne