//vai ser passado por um body a data em milisegundos
//dito isso eu vou inserir no banco no formato de data mesmo
//e pra pegar do banco vai ser no formato de milisegundos
//e em milisegundos vai ser mandado para o front
module.exports = app => {
    const postAgenda = async (req,res) => {
        await app.db.transaction(async (trx) => {
            let teste2 = req.body.data.toLocaleString()
            var dia = new Date(+teste2);
            const aux = await app.db
                .raw(`select "idCliente", extract(epoch from "dataAgenda" at time zone 'UTC')*1000 from "Agenda"
                    where "dataAgenda" = '${dia.toLocaleString()}' and "idCliente" = ${req.body.idCliente}`)
                .then(data => {
                    if(data.rows.length > 0){
                        return 1;
                    }else{
                        return 0;
                    }
                })
                .catch(trx.rollback, err => res.status(400).json(err))


            const teste = await app.db('Agenda')
                .where({dataAgenda: dia.toLocaleString()})
                .then(idData =>{ 
                    if(idData.length > 0){
                        return 1;
                    }else{
                        return 0;
                    }
                })
                .catch(trx.rollback, err => res.status(400).json(err))

            
            if(aux == 0){
                if(teste == 0){
                    var date = req.body.data.toString();
                    await app.db('Agenda')
                        .insert({dataAgenda: dia.toLocaleString(), idCliente: req.body.idCliente})
                        .then(trx.commit)
                        .then(res.status(200).send('Horario marcado'))
                        .catch(trx.rollback, err => res.status(400).json(err))
                }
                else{
                    res.status(203).send('Horario indisponivel')
                }
            }else{
                res.status(203).send('Pessoa já tem um horario marcado para este dia')
            }
        })
    }

    const getAgenda = async (req, res) => {
        await app.db('Agenda')
            .then(agenda => {
                for(dia of agenda){
                    let aux1 = dia.dataAgenda
                    dia.dataAgenda = aux1.getTime()
                }
                res.json(agenda)
            })
    }

    return { postAgenda, getAgenda }
}