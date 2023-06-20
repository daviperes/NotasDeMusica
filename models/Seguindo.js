const mongoose = require('mongoose');

const SeguidoresSchema = new mongoose.Schema({
    seguindo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Seguidores', SeguidoresSchema);
