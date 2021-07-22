
exports.up = function(knex) {
    return knex.schema.createTable('Mecanico', table => {
        table.increments('idMecanico').primary()
        table.string('nomeMecanico',255)
        table.string('cpfMecanico',11)
        table.integer('idEndereco').references('idEndereco').inTable('Endereco')
        table.integer('nr_casaMecanico')
        table.integer('idLogin').references('idLogin').inTable('Login')
    }).then(() =>{
        return knex('Mecanico').insert([
            {
                nomeMecanico: 'Paulao',
                cpfMecanico: '03365617922',
                idEndereco: 2,
                nr_casaMecanico: 1234,
                idLogin: 3
            },
            {
                nomeMecanico: 'Tuco',
                cpfMecanico: '85776239982',
                idEndereco: 1,
                nr_casaMecanico: 4321,
                idLogin: 4
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Mecanico')
};
