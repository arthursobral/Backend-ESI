
exports.up = function(knex) {
    return knex.schema.createTable('Endereco', table => {
        table.increments('idEndereco').primary()
        table.integer('idRua').references('idRua').inTable('Rua')
        table.integer('idBairro').references('idBairro').inTable('Bairro')
        table.integer('idCidade').references('idCidade').inTable('Cidade')
        table.string('cepEndereco',16)
    }).then(() =>{
        return knex('Endereco').insert([
            {
                idRua: 1,
                idBairro: 1,
                idCidade: 1,
                cepEndereco: '85857750'
            },
            {
                idRua: 3,
                idBairro: 2,
                idCidade: 1,
                cepEndereco: '85853450'
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Endereco')
};
