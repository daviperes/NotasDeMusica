const CLIENT_ID = 'd98ace964ce846a4886d7950bec01e82';
const CLIENT_SECRET = '6fe285004bb34d28a66f8ebe03445b68';
const axios = require('axios');

const authParams = new URLSearchParams();
authParams.append('grant_type', 'client_credentials');
authParams.append('client_id', CLIENT_ID);
authParams.append('client_secret', CLIENT_SECRET);

let accessToken = '1234';


const getAccessToken = async () => {
  try {
    const authResponse = await axios.post('https://accounts.spotify.com/api/token', authParams);
    accessToken = authResponse.data.access_token;
    console.log('Token de acesso atualizado:', accessToken);
  } catch (error) {
    console.error('Erro ao obter token de acesso:', error.message);
  }
};


async function searchAlbumByName(albumName) {
  try {
    console.log(accessToken)
    const limit = 10;
    const offset = 0;
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        type: 'album',
        q: albumName,
        limit: limit,
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.albums.items;
  } catch (error) {
      if (error.response && error.response.status === 401){
        console.log('Entro no erro, accesstoken: ' + accessToken);
        await getAccessToken();
        return searchAlbumByName(albumName);
      }
      else{
        console.error('Erro na busca do álbum:', error.message);
      }
  }
}

async function getAlbumCoverById(albumId) {
  console.log('Album id:', albumId);
  if(!albumId){
    return null;
  }
  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const album = response.data;
    if (album && album.images && album.images.length > 0) {
      return album.images[0].url;
    } else {
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Erro de autenticação. Tentando obter novo token de acesso.');
      await getAccessToken();
      return getAlbumCoverById(albumId);
    } else {
      console.error('Erro ao buscar a capa do álbum:', error.message);
      return null;
    }
  }
}

module.exports = {
  searchAlbumByName,
  getAlbumCoverById,
};