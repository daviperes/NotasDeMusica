const Seguindo = require('../../models/Seguindo');
const Usuario = require('../../models/Usuario')

async function seguirUsuario(req, res) {
  const usuarioId = req.user.id;
  const tag = req.params.tag;

  try {
    const usuarioEncontrado = await Usuario.findOne({tag : tag})
    const usuarioSeguindoId = usuarioEncontrado._id;

    const novaRelacao = new Seguindo({
      usuario: usuarioId,
      seguindo: usuarioSeguindoId
    });
    await novaRelacao.save();
    console.log('Usuário seguido com sucesso!');
  } catch (error) {
    console.error('Erro ao seguir usuário:', error);
  }
}

async function deixarDeSeguirUsuario(req, res) {
  const usuarioId = req.user.id;
  const tag = req.params.tag;

  try {
    const usuarioEncontrado = await Usuario.findOne({ tag: tag });
    const usuarioSeguindoId = usuarioEncontrado._id;

    // Encontre e remova o registro de Seguindo correspondente
    await Seguindo.findOneAndRemove({ usuario: usuarioId, seguindo: usuarioSeguindoId });

    console.log('Usuário deixou de seguir com sucesso!');
  } catch (error) {
    console.error('Erro ao deixar de seguir usuário:', error);
  }
}
async function seguindo(req, res){
  const usuarioId = req.user.id;
  const tag = req.params.tag;

  try {
    const usuarioEncontrado = await Usuario.findOne({ tag: tag });
    const usuarioSeguindoId = usuarioEncontrado._id;

    // Encontre e remova o registro de Seguindo correspondente
    const seguindo = await Seguindo.findOne({ usuario: usuarioId, seguindo: usuarioSeguindoId });
    console.log('Seguindo:', seguindo);

    return seguindo;
  } catch (error) {
    console.error('Erro:', error);
  }
}

module.exports = {seguirUsuario, deixarDeSeguirUsuario, seguindo};