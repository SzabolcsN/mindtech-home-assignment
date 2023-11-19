const { ObjectId } = require('mongodb')

// Convert string id to ObjectId for mongodb
module.exports = (id) => {
    if (!id) {
        return null
    }
    const newId = new ObjectId(id)
    return newId
}