
exports.up = function(knex) {
    return knex.schema.createTable('Cliente' , table => {
        table.increments('idCliente').primary()
        table.string('nomeCliente')
        table.string('cpfCliente',11)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Cliente')
};
