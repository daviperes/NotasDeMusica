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
    //const formattedAlbumName = albumName.replace(/\s/g, '%20');
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        type: 'album',
        q: albumName,
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

module.exports = { searchAlbumByName };
