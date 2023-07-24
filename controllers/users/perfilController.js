const Postagem = require('../../models/Postagem'); // Importe o modelo de postagem
const Usuario = require('../../models/Usuario'); // Importe o modelo de postagem
const spotify = require('../../config/spotify');
const seguirController = require('../../controllers/users/seguirController');
const loginController = require('../../controllers/users/loginController');

async function abreTelaPerfil(req, res) {
    
    try {
        const usuario = await Usuario.findOne({ tag: req.params.tag });
        console.log('cu usuario', usuario)
        const postagens = await Postagem.find({ usuarioId: usuario._id })
            .sort({ dataHora: -1 })
            .lean(); // Adicione o método `.lean()` para converter os documentos do Mongoose em objetos JavaScript simples
        const postagensComImagens = await Promise.all(postagens.map(async (postagem) => {
            const imageUrl = await spotify.getAlbumCoverById(postagem.albumId);
            postagem.imageUrl = imageUrl;
            return postagem;
        }));
        const usuarioLogadoTag = await loginController.tagUsuarioLogado(req);
        console.log('Postagens', postagensComImagens);
        console.log('dale')

        const seguindoUsuario = await seguirController.seguindo(req);

        res.render('perfil', { postagens: postagensComImagens, 
            userTag: req.params.tag, 
            seguindoUsuario: seguindoUsuario, 
            usuarioLogadoTag: usuarioLogadoTag });
    } catch (error) {
        console.error(error.message);
        console.log('deuu ruim')
    }
}

module.exports ={abreTelaPerfil}