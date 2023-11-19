const Itinerarie = require("../models/itineraries")

// Soft delete document - mark the document in the DB - isDeleted: true
// DELETE /api/:id
const remove = (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).send("Something went wrong")
  }

  // Not removing from the DB, just mark as deleted
  Itinerarie.findByIdAndUpdate(id, { isDeleted: true }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "The itinerarie not found!"
        })
      } else {
        res.send({
          message: "The itinerarie successfully deleted!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Something went wrong!"
      })
    })
}

module.exports = remove