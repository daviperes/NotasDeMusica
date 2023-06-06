const Postagem = require('../../models/Postagem.js');

async function abreTelaPostagem (req, res){
    res.render('postagem.ejs');
}

async function postagem(req, res){
    var postagem = new Postagem();
    postagem.usuarioId = req.user.id;
    postagem.albumId = req.query.albumId;
    postagem.texto = req.body.texto;

    try{
        const postagemSalva = await postagem.save();
        console.log(postagemSalva);
    }catch(error){
        console.error(error);
        //res.render('paginaerro.ejs');
    }

}

module.exports = { postagem, abreTelaPostagem };