
exports.up = function(knex) {
    return knex.schema.createTable('Marca', table => {
        table.increments('idMarca').primary()
        table.string('nomeMarca',255)
    }).then(() =>{
        return knex('Marca').insert([
            {
                nomeMarca: 'Toyota'
            },
            {
                nomeMarca: 'Ford'
            },
            {
                nomeMarca: 'Honda'
            }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Marca')
};
