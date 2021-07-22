
exports.up = function(knex) {
    return knex.schema.createTable('Login', table => {
        table.increments('idLogin').primary()
        table.string('emailLogin',255)
        table.string('senhaLogin',50)
        table.boolean('tipoLogin')
    }).then(() =>{
        return knex('Login').insert([
            {
                emailLogin: 'teste_cliente123@email.com',
                senhaLogin: 'teste123',
                tipoLogin: 0,
            },
            {
                emailLogin: 'teste_cliente1234@email.com',
                senhaLogin: 'teste1234',
                tipoLogin: 0,
            },
            {
                emailLogin: 'teste_mec@email.com',
                senhaLogin: 'teste321',
                tipoLogin: 1,
            },
            {
                emailLogin: 'teste_mec2@email.com',
                senhaLogin: 'teste4321',
                tipoLogin: 1,
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Login')
};
