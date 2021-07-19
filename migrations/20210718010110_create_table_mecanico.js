
exports.up = function(knex) {
    return knex.schema.createTable('Mecanico', table => {
        table.increments('idMecanico').primary()
        table.string('nomeMecanico')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Mecanico')
};
