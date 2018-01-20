module.exports = function(app) {
    app.get('/pagamentos', function(req, res){
        console.log('Recebida requisição de teste')
        res.send('Ok. ')
    })

    app.post('/pagamentos/pagamento', function(req, res) {

        // Verificacao dos erros 
        req.assert("forma_de_pagamento", "Forma de pagamento eh obrigatorio").notEmpty()
        req.assert("valor", "Valor eh obrigatorio e deve ser decimal").notEmpty().isFloat()
        // Validacao dos erros
        var erros = req.validationErrors()

        if(erros) {
            console.log('Erros de validacao encontrados')
            res.status(500).send(erros)
            return
        }

        var pagamento = req.body
        console.log('Processando uma requisicao de um novo pagamento.')

        pagamento.status = 'Criado'
        pagamento.data = new Date

        var connection = app.persistencia.connectionFactory()
        var pagamentoDao = new app.persistencia.PagamentoDao(connection)
        console.log(pagamentoDao)

        pagamentoDao.salva(pagamento, function(erro, resultado) {
            if(erro){
                console.log('Erro ao inserir no bd: ' + erro)
                res.status(400).send(erro)
            } else {
                console.log('pagamento criado')
                res.location('/pagamentos/pagamento/' + resultado.insertId) // Retorna localizacao do pagamento gerado quando um recurso eh criado
                res.status(201).json(pagamento) // 201 significa created
                // Faz sentido ser 201, pois estamos criando uma nova instancia no bd
            }
        })

    })
}

