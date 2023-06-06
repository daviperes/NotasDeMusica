const mongoose = require('mongoose');

const PostagemSchema = new mongoose.Schema({
    usuarioId: {
        type: 'String',
        required: true
    },
    albumId:{
        type: 'String',
        required: true
    },
    texto: {
        type:'String',
        required: true
    },
})

module.exports = mongoose.model("Postagem", PostagemSchema);