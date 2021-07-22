exports.up = function(knex) {
    return knex.schema.createTable('Carro' , table => {
        table.increments('idCarro').primary()
        table.integer('idModelo').references('idModelo').inTable('Modelo')
        table.string('placaCarro')
        table.integer('idCliente').references('idCliente').inTable('Cliente')
        table.integer('idCor').references('idCor').inTable('Cor')
        table.integer('anoCarro')
    }).then(() =>{
        return knex('Carro').insert([
            {
                idModelo: 1,
                placaCarro: 'AUD-5488',
                idCliente: 2,
                idCor: 1,
                anoCarro: 2010
            },
            {
                idModelo: 2,
                placaCarro: 'AJO-4896',
                idCliente: 1,
                idCor: 1,
                anoCarro: 2019
            },
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Carro')
};