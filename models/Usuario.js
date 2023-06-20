const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    tag: {
        type: "String",
    },
    email: {
        type: "String",
    },
    senha: {
        type: "String",
    },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
