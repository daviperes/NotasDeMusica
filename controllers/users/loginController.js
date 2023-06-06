const bcrypt = require('bcrypt')
const Usuario = require('../../models/Usuario');

function login(req, res) {
    // res.redirect('/');
    res.send('os guri')
};

async function abreTelaCadastro(req, res) {
    res.render("cadastro.ejs")
}

async function abreTelaLogin(req, res) {
    res.render("login.ejs" );
    // res.send('os guri')
}
async function principal(req,res){
    res.send('os guri');
}

async function cadastro(req, res) {
    var usuario = new Usuario();
    usuario.tag = req.body.tag;
    usuario.email = req.body.email;
    usuario.senha = req.body.senha;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashSenha = bcrypt.hashSync(usuario.senha, salt);
        usuario.senha = hashSenha;

        const usuarioSalvo = await usuario.save()
        console.log(usuarioSalvo);
        res.redirect("/login");
    } catch (error) {
        res.send("Aconteceu o seguinte erro: " + error);
    }


}

module.exports = { login, cadastro, abreTelaCadastro, abreTelaLogin, principal }