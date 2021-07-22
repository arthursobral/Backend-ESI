
exports.up = function(knex) {
    return knex.schema.createTable('Modelo', table => {
        table.increments('idModelo').primary()
        table.integer('idMarca').references('idMarca').inTable('Marca')
        table.string('nomeModelo')
    }).then(() =>{
        return knex('Modelo').insert([
            {
                idMarca: 2,
                nomeModelo: 'Fiesta'
            },
            {
                idMarca: 3,
                nomeModelo: 'Civic'
            },
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Modelo')
};
