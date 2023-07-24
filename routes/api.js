const express = require('express');
const router = express.Router();
const loginController = require('../controllers/users/loginController');
const postagemController = require('../controllers/users/postagemController');
const buscaController = require('../controllers/users/buscaController');
const perfilController = require('../controllers/users/perfilController');
const seguirController = require('../controllers/users/seguirController')
const auth = require('../config/auth')

//login e cadastro

router.get('/cadastro', loginController.abreTelaCadastro);
router.get('/login', loginController.abreTelaLogin);
router.get('/principal', auth.ensureAuthenticated, postagemController.exibirPostagensSeguidores);
router.get('/logout', (req, res) => {
    req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao fazer logout' });
      }
      res.redirect('/login');
    });
  });  
router.post('/cadastro', loginController.cadastro);
router.post('/login', loginController.login);
//busca e postagem
router.get('/busca', auth.ensureAuthenticated, buscaController.abreTelaBusca);
router.get('/postagem', auth.ensureAuthenticated, postagemController.abreTelaPostagem);
router.post('/postagem', auth.ensureAuthenticated, postagemController.postagem);

//perfis
router.get('/:tag',auth.ensureAuthenticated, perfilController.abreTelaPerfil);
router.post('/seguir/:tag', auth.ensureAuthenticated, seguirController.seguirUsuario);
router.post('/deixarDeSeguir/:tag', auth.ensureAuthenticated, seguirController.deixarDeSeguirUsuario);
module.exports = router;