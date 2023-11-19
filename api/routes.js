const router = require("express").Router()
const routes = require("./controllers")

// define routes
module.exports = (app) => {
    router.get("/", routes.findAll)
  
    router.get("/:id", routes.findOne)

    router.post("/", routes.create)
  
    router.put("/:id", routes.update)
  
    router.delete("/:id", routes.remove)

    app.use('/api/itineraries', router)
}
