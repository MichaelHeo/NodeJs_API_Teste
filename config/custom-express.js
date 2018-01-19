var express = require('express')
var consign = require('consign')

module.exports = function() {
    var app = express() // Referência do express

    consign()
        .include('controllers')
        .into(app) // Pasta controllers é definido dentro de app, o que nos permite usar a var app dentro das funções de modules.exports

    return app
}
