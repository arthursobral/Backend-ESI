
exports.up = function(knex) {
    return knex.schema.createTable('Peca', table => {
        table.increments('idPeca').primary()
        table.string('nomePeca')
    }).then(() =>{
        return knex('Peca').insert([
            {
                nomePeca: 'Carburador'
            },
            {
                nomePeca: 'Oleo'
            },
            {
                nomePeca: 'Radiador'
            },
            {
                nomePeca: 'Pneus'
            },
            {
                nomePeca: 'Bateria'
            },
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Peca')
};
