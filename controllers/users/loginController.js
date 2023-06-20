const bcrypt = require('bcrypt')
const Usuario = require('../../models/Usuario');

function login(req, res) {
    // res.redirect('/');
    res.send('os guri')
};

async function abreTelaCadastro(req, res) {
    res.render("cadastro.ejs", {error:""})
}

async function abreTelaLogin(req, res) {
    res.render("login.ejs", {error:""});
    // res.send('os guri')
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

module.exports = { login, cadastro, abreTelaCadastro, abreTelaLogin, principal }