
exports.up = function(knex) {
    return knex.schema.createTable('Conserto' , table => {
        table.increments('idConserto').primary()
        table.integer('idCarro').references('idCarro').inTable('Carro')
        table.integer('idMecanico').references('idMecanico').inTable('Mecanico')
        table.integer('idPeca').references('idPeca').inTable('Peca')
        table.text('obsConserto')
        table.double('valorConserto')
        table.datetime('previsaoConserto')
        table.datetime('dataConserto')
        table.boolean('confirmacaoConserto')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Conserto')
};

