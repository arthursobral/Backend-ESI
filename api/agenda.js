module.exports = app => {
    const postAgenda = async (req,res) => {
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
        
        if(teste == 0){
            await app.db('Agenda')
                .insert({dataAgenda: req.body.data, horaAgenda: req.body.hora, idCliente: req.body.idCliente})
                .then(res.status(200).send('Horario marcado'))
        }else{
            res.status(203).send('Horario indisponivel')
        }

    }

    const getAgenda = async (req, res) => {
        await app.db('Agenda')
            .then(agenda => res.json(agenda))
    }

    return { postAgenda, getAgenda }
}