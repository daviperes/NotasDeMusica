const Postagem = require('../../models/Postagem.js');
const Seguidores = require('../../models/Seguindo.js')
const loginController = require('../../controllers/users/loginController.js')

async function abreTelaPostagem (req, res){
    const albumId = req.query.albumId;
    console.log(albumId);
    const usuarioLogadoTag = await loginController.tagUsuarioLogado();
    res.render('postagem.ejs', {albumId: albumId, usuarioLogadoTag: usuarioLogadoTag});
}

async function postagem(req, res){
    var postagem = new Postagem();
    postagem.usuarioId = req.user.id;
    postagem.albumId = req.body.albumId;
    postagem.texto = req.body.texto;
    postagem.nota = req.body.nota;
    
    console.log(req.body);
    try{
        const postagemSalva = await postagem.save();
        console.log(postagemSalva);
        res.send('sucesso!');
    }catch(error){
        console.error(error);
        //res.render('paginaerro.ejs');
    }
}

async function exibirPostagensSeguidores(req, res) {
  const usuarioId = req.user.id;

  try {
    // Encontre os IDs dos usuários seguidos pelo usuário logado
    const seguidores = await Seguidores.find({ usuario: usuarioId });
    const usuariosSeguidosIds = seguidores.map(seguidor => seguidor.seguindo);

    // Encontre as postagens dos usuários seguidos
    const postagens = await Postagem.find({ usuarioId: { $in: usuariosSeguidosIds } });
    
    // Chamada da função tagUsuarioLogado
    const usuarioLogadoTag = await loginController.tagUsuarioLogado(req);

    // Verifique se o usuário foi encontrado antes de continuar
    if (!usuarioLogadoTag) {
      console.error('Usuário não encontrado');
      res.status(404).send('Usuário não encontrado.');
      return;
    }

    // Renderize a view e passe as postagens como dados
    res.render('principal', { postagens: postagens, usuarioLogadoTag: usuarioLogadoTag });
  } catch (error) {
    console.error('Erro ao exibir postagens dos seguidores:', error);
    res.status(500).send('Erro ao exibir postagens dos seguidores.');
  }
}

module.exports = { postagem, abreTelaPostagem, exibirPostagensSeguidores };