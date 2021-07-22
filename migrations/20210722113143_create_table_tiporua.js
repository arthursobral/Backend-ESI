
exports.up = function(knex) {
    return knex.schema.createTable('TipoRua', table => {
        table.increments('idTipoRua').primary()
        table.string('siglaTipoRua',2)
    }).then(() =>{
        return knex('TipoRua').insert([
            {
                siglaTipoRua: 'Av'
            },
            {
                siglaTipoRua: 'R'
            },
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('TipoRua')
};
