
exports.up = function(knex) {
    return knex.schema.createTable('Pais', table => {
        table.increments('idPais').primary()
        table.string('nomePais',50)
    }).then(() =>{
        return knex('Pais').insert([
            {
                nomePais: 'Brasil'
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Pais')
};
