
exports.up = function(knex) {
    return knex.schema.createTable('Cor', table => {
        table.increments('idCor').primary()
        table.string('nomeCor',50)
    }).then(() =>{
        return knex('Cor').insert([
            {
                nomeCor: 'Preto'
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Cor')
};
