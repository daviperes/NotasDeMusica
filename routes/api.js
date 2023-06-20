const express = require('express');
const passport = require('passport');
const router = express.Router();
const loginController = require('../controllers/users/loginController');
const postagemController = require('../controllers/users/postagemController');
const buscaController = require('../controllers/users/buscaController');
const auth = require('../config/auth')

//login e cadastro
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/principal',
        failureRedirect: '/login',
    }),
    
);
router.get('/cadastro', loginController.abreTelaCadastro);
router.get('/login', loginController.abreTelaLogin);
router.get('/principal', auth.ensureAuthenticated, loginController.principal);
router.post('/cadastro', loginController.cadastro);

//busca e postagem
router.get('/busca', auth.ensureAuthenticated, buscaController.abreTelaBusca);
router.get('/postagem', auth.ensureAuthenticated, postagemController.abreTelaPostagem);
router.post('/postagem', auth.ensureAuthenticated, postagemController.postagem);

module.exports = router;