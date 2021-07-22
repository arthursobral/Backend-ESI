
exports.up = function(knex) {
    return knex.schema.createTable('Cidade', table => {
        table.increments('idCidade').primary()
        table.integer('idEstado').references('idEstado').inTable('Estado')
        table.string('nomeCidade',50)
    }).then(() =>{
        return knex('Cidade').insert([
            {
                idEstado: 1,
                nomeCidade: 'Foz do Iguacu'
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Cidade')
};
