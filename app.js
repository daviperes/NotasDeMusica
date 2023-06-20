const express = require("express");
const cors = require("cors");
const app = express();
var port = process.env.PORT || 3000;
const path = require("path");
const apiRoute = require("./routes/api.js");
const connection = require('./config/database');
const passport = require("passport");
var session = require("express-session");
require("./config/passport.js");

app.use(cors());

app.use(
  session({
    secret: "Adm",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use("/", apiRoute);

app.get("/", function (req, res) {
  if(req.isAuthenticated()){
    res.send('Logado')
  } else{
    res.render("login.ejs");
  }
});

async function init() {
    try {
        const result = await connection()
        app.listen(port, () => {
            console.log("Servidor funcionando na porta 3000");
        });
    } catch (error) {
        console.log('error',error)
    }
}

init();