module.exports = app => {
    app.post('/agendar', app.api.agenda.postAgenda)
    app.get('/agendar',app.api.agenda.getAgenda)
    app.post('/orcamento',app.api.orcamento.postOrcamento)
    app.get('/orcamento/:placa',app.api.orcamento.getOrcamento)
}