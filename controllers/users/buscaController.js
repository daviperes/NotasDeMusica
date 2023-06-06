const spotify = require('../../config/spotify.js');

async function busca(req, res){
    const nomeAlbum = req.params.nomeAlbum;
    const albuns = await spotify.searchAlbumByName(nomeAlbum);

    res.render('busca.ejs', { albuns: albuns });
}

module.exports = {busca};