const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    task: String,
    description: String,
    Status: String,
    userId: String
})

module.exports = mongoose.model("Item", itemSchema)