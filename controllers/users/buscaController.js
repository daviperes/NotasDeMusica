const spotify = require('../../config/spotify.js');
const loginController = require('../../controllers/users/loginController.js')
async function abreTelaBusca(req, res) {
    const nomeAlbum = req.query.nomeAlbum || '';
    let albuns = [];
  
    if (nomeAlbum && nomeAlbum.length) {
      albuns = await spotify.searchAlbumByName(nomeAlbum) || [];
    }
    const userTag = req.user.tag;
    const usuarioLogadoTag = loginController.tagUsuarioLogado(req);
    res.render('busca.ejs', { nomeAlbum: nomeAlbum, albuns: albuns, userTag: userTag, usuarioLogadoTag: usuarioLogadoTag });
  }
  
module.exports = { abreTelaBusca};