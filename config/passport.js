const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, password, done) => {
    const user = await Usuario.findOne({ email: email })
    
    if (!user) return done(null, false, { message: 'Usuário não encontrado.' });

    bcrypt.compare(password, user.senha, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Senha incorreta.' });
      }
    });

  })
);
passport.use(passport.authenticate('local'));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
