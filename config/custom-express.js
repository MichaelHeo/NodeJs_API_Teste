var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')

module.exports = function() {
    var app = express() // Referência do express

    // Pronto para o Content-type Negotiation 
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(expressValidator())

    consign()
        .include('controllers')
        .then('persistencia')
        .into(app) // Pasta controllers é definido dentro de app, o que nos permite usar a var app dentro das funções de modules.exports

    return app
}
