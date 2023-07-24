const mongoose = require('mongoose');

const PostagemSchema = new mongoose.Schema({
    usuarioId: {
        type: String,
        required: true
    },
    albumId:{
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    nota: {
        type: String,
        required: true
    },
    dataHora: {
        type: Date,
        default: Date.now  // Define o valor padrão como a data/hora atual
    }
});

module.exports = mongoose.model("Postagem", PostagemSchema);
