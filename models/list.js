const mongoose = require("mongoose");

// Create mongoose Schema
const ListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create mongoose Model
const List = mongoose.model("List", ListSchema);

module.exports = { List };
