const spotify = require('../../config/spotify.js');

// async function abreTelaBusca(req, res){
//     console.log(req.query);
//     const nomeAlbum = req.query.nomeAlbum;
//     let albuns = []
//     if(nomeAlbum && nomeAlbum.length){
//         albuns = await spotify.searchAlbumByName(nomeAlbum) || []; 
//     }
//     res.render('busca.ejs', {nomeAlbum: nomeAlbum || '', albuns: albuns});
// }

async function abreTelaBusca(req, res) {
    const nomeAlbum = req.query.nomeAlbum || '';
    let albuns = [];
  
    if (nomeAlbum && nomeAlbum.length) {
      albuns = await spotify.searchAlbumByName(nomeAlbum) || [];
    }
  
    res.render('busca.ejs', { nomeAlbum: nomeAlbum, albuns: albuns });
  }
  
module.exports = { abreTelaBusca};