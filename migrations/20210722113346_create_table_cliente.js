
exports.up = function(knex) {
    return knex.schema.createTable('Cliente', table => {
        table.increments('idCliente').primary()
        table.string('nomeCliente',255)
        table.string('cpfCliente',11)
        table.integer('idEndereco').references('idEndereco').inTable('Endereco')
        table.integer('nr_casaCliente')
        table.integer('idLogin').references('idLogin').inTable('Login')
    }).then(() =>{
        return knex('Cliente').insert([
            {
                nomeCliente: 'Nata Rafael',
                cpfCliente: '13111542998',
                idEndereco: 2,
                nr_casaCliente: 123,
                idLogin: 1
            },
            {
                nomeCliente: 'Arthur Sobral',
                cpfCliente: '47261774944',
                idEndereco: 1,
                nr_casaCliente: 321,
                idLogin: 2
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Cliente')
};
