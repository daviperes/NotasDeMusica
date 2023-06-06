const mongoose = require("mongoose");

const uri = "mongodb+srv://daviperes:tcc2023daviperes@cluster0.phrhdel.mongodb.net/?retryWrites=true&w=majority";

module.exports = () => mongoose.connect(uri);
