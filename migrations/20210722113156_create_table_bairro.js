
exports.up = function(knex) {
    return knex.schema.createTable('Bairro', table => {
        table.increments('idBairro').primary()
        table.string('nomeBairro',50)
    }).then(() =>{
        return knex('Bairro').insert([
            {
                nomeBairro: 'Vila A'
            },
            {
                nomeBairro: 'Vila C'
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Bairro')
};
