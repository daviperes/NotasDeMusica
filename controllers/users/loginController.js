const bcrypt = require('bcrypt')
const Usuario = require('../../models/Usuario');
const passport = require('passport');

async function abreTelaCadastro(req, res) {
    res.render("cadastro.ejs", {error:""})
}

async function abreTelaLogin(req, res) {
    res.render("login.ejs", {error:""});
}
async function principal(req,res){
    res.send('usuário logado');
}

async function cadastro(req, res) {
    const tag = req.body.tag;
    const email = req.body.email;

    try {
        const tagExistente = await Usuario.findOne({ tag });
        if (tagExistente) {
            return res.render("cadastro", {error: "A tag já está sendo utilizada. Por favor, escolha outra tag."});
        }
        const emailExistente = await Usuario.findOne({ email });
        if (emailExistente) {
            return res.render("cadastro", {error: "O email já está sendo utilizado. Por favor, use outro email."});
        }

        const usuario = new Usuario();
        usuario.tag = tag;
        usuario.email = email;
        usuario.senha = req.body.senha;

        const salt = bcrypt.genSaltSync(10);
        const hashSenha = bcrypt.hashSync(usuario.senha, salt);
        usuario.senha = hashSenha;

        const usuarioSalvo = await usuario.save();
        console.log(usuarioSalvo);
        res.redirect("/login");
    } catch (error) {
        res.send("Aconteceu o seguinte erro: " + error);
    }
}

async function login(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          // Defina a mensagem de erro
          return res.render("login", {error: "E-mail ou senha inválidos."})
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect('/principal');
        });
      })(req, res, next);
}


async function tagUsuarioLogado(req){
  console.log('caiu aqui');

  // Verifique se req.user está definido e req.user.id tem um valor
  if (req && req.user && req.user.id) {
      usuarioId = req.user.id;
      usuario = await Usuario.findById(usuarioId);

      tagUsuario = usuario.tag;

      return tagUsuario;
  } else {
      // Se req.user não estiver definido ou req.user.id estiver vazio, retorne false
      return false;
  }
}
module.exports = { login, cadastro, abreTelaCadastro, abreTelaLogin, principal, tagUsuarioLogado }