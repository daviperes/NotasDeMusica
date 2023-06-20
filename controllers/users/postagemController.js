const Postagem = require('../../models/Postagem.js');

async function abreTelaPostagem (req, res){
    const albumId = req.query.albumId;
    console.log(albumId);
    res.render('postagem.ejs', {albumId: albumId});
}

async function postagem(req, res){
    var postagem = new Postagem();
    postagem.usuarioId = req.user.id;
    postagem.albumId = req.body.albumId;
    postagem.texto = req.body.texto;
    postagem.classificacao = req.body.classificacao;
    
    try{
        const postagemSalva = await postagem.save();
        console.log(postagemSalva);
        res.send('sucesso!');
    }catch(error){
        console.error(error);
        //res.render('paginaerro.ejs');
    }

}

module.exports = { postagem, abreTelaPostagem };