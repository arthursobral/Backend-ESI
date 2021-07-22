
exports.up = function(knex) {
    return knex.schema.createTable('Rua', table => {
        table.increments('idRua').primary()
        table.integer('idTipoRua').references('idTipoRua').inTable('TipoRua')
        table.string('nomeRua',150)
    }).then(() =>{
        return knex('Rua').insert([
            {
                idTipoRua: 1,
                nomeRua: 'Brasil'
            },
            {
                idTipoRua: 2,
                nomeRua: 'Melro'
            },
            {
                idTipoRua: 2,
                nomeRua: 'Bolivia'
            },
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Rua')
};
