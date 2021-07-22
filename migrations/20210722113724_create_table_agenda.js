
exports.up = function(knex) {
    return knex.schema.createTable('Agenda' , table => {
        table.increments('idAgenda').primary()
        table.datetime('dataAgenda')
        table.integer('idCliente').references('idCliente').inTable('Cliente')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Agenda')
};
