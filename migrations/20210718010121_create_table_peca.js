
exports.up = function(knex) {
    return knex.schema.createTable('Peca', table => {
        table.increments('idPeca').primary()
        table.string('nomePeca')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Peca')
};
