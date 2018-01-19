var app = require('./config/custom-express')() // Chama o module.exports do custom-express

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000')
})
