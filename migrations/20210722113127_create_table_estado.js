
exports.up = function(knex) {
    return knex.schema.createTable('Estado', table => {
        table.increments('idEstado').primary()
        table.integer('idPais').references('idPais').inTable('Pais')
        table.string('nomeEstado',50)
    }).then(() =>{
        return knex('Estado').insert([
            {
                idPais: 1,
                nomeEstado: 'Parana',
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Estado')
};
