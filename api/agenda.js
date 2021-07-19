module.exports = app => {
    const postAgenda = async (req,res) => {
        await app.db.transaction(async (trx) => {
            const aux = await app.db('Agenda')
                .where({dataAgenda: req.body.data, idCliente: req.body.idCliente})
                .then(data => {
                    if(data.length > 0){
                        return 1;
                    }else{
                        return 0;
                    }
                })

            const teste = await app.db('Agenda')
                .where({dataAgenda: req.body.data, horaAgenda: req.body.hora})
                .then(idData =>{ 
                    if(idData.length > 0){
                        return 1;
                    }else{
                        return 0;
                    }
                })
                .catch(err => res.status(400).json(err))

            
            if(aux == 0){
                if(teste == 0){
                        await app.db('Agenda')
                            .insert({dataAgenda: req.body.data, horaAgenda: req.body.hora, idCliente: req.body.idCliente})
                            .then(trx.commit)
                            .then(res.status(200).send('Horario marcado'))
                            .catch(trx.rollback, err => res.status(400).json(err))
                }
                else{
                    res.status(203).send('Horario indisponivel')
                }
            }
            else{
                res.status(203).send('Pessoa já tem um horario marcado para este dia')
            }
        })
    }

    const getAgenda = async (req, res) => {
        await app.db('Agenda')
            .then(agenda => res.json(agenda))
    }

    return { postAgenda, getAgenda }
}