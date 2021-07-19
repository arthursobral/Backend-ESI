
exports.up = function(knex) {
    return knex.schema.createTable('ModeloCarro', table => {
        table.increments('idModelo').primary()
        table.string('nomeModelo')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ModeloCarro')
};
