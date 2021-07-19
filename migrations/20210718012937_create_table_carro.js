exports.up = function(knex) {
    return knex.schema.createTable('Carro' , table => {
        table.increments('idCarro').primary()
        table.integer('idModelo').references('idModelo').inTable('ModeloCarro')
        table.string('placaCarro')
        table.integer('idCliente').references('idCliente').inTable('Cliente')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Carro')
};