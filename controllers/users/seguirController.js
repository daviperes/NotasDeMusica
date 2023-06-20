const Seguidores = require('../../models/Seguidores');
const Usuario = require('../../models/Usuario')

async function seguirUsuario(req, res) {
  const usuarioId = req.user.id;
  const tag = req.params.tag;

  try {
    const usuarioEncontrado = await Usuario.findOne({tag : tag})
    const usuarioSeguindoId = usuarioEncontrado._id;

    const novaRelacao = new Seguidores({
      usuario: usuarioId,
      seguindo: usuarioSeguindoId
    });
    await novaRelacao.save();
    console.log('Usuário seguido com sucesso!');
  } catch (error) {
    console.error('Erro ao seguir usuário:', error);
  }
}

module.exports = {seguirUsuario};
