const { connect } = require("mongoose")

const connection = "mongodb://mongo:27017/travel-planner"

const connectDb = () => {
  return connect(connection)
}

module.exports = connectDb
