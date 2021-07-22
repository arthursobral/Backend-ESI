module.exports = app => {
    const postOrcamento = async (req,res) => {
        await app.db.transaction(async (trx) => {
            const cliente = await app.db('Cliente')
                                .where({nomeCliente: req.body.nome})
                                .then(id => {return id})
                                .catch(trx.rollback, err => res.status(400).json(err))

            if(cliente.length > 0){
                const aux = await app.db('Carro')
                    .where({idCliente: cliente[0].idCliente, placaCarro: req.body.placa})
                    .then(data => {return data})
                    .catch(trx.rollback, err => res.status(400).json(err))
                
                const mec = await app.db('Mecanico')
                    .where({nomeMecanico: req.body.mecanico})
                    .then(mec => {
                        return mec[0].idMecanico
                    })
                    .catch(trx.rollback, err => res.status(400).json(err))

                const peca = await app.db('Peca')
                    .where({nomePeca: req.body.peca})
                    .then(mec => {
                        return mec[0].idPeca
                    })
                    .catch(trx.rollback, err => res.status(400).json(err))
                
                
                await app.db('Conserto')
                    .insert({idCarro: aux[0].idCarro, idMecanico: mec, idPeca: peca, obsConserto: req.body.obs,
                        valorConserto: req.body.valor,previsaoConserto: req.body.previsao})
                    .then(trx.commit)
                    .then(res.status(200).send('Registro de manutencao feito'))
                    .catch(trx.rollback, err => res.status(400).json(err))
                
            }else{
                return res.send('Cliente nao encontrado')
            }
        })
    }

    const getOrcamento = async (req, res) => {
        const carros = [{
            carro: undefined,
            placa: undefined,
            ano: undefined,
            cor: undefined,
            previsao: undefined,
            dataFinal: undefined
        }]
    
        const aux = await app.db('Carro')
            .where({placaCarro: req.params.placa})
            .then(data => { return data})
            .catch(err => res.status(400).json(err))

        if(aux.length == 0) {
            return res.send('Carro inexistente')
        }

        const consertos = await app.db('Conserto')
                .where({idCarro: aux[0].idCarro})
                .then(conserto => {return conserto})
                .catch(err => res.status(400).json(err))
        
        if(consertos.length == 0) {
            return res.send('Carro nao estao na manutencao')
        }
        else{
            await app.db.raw(`select "idConserto","nomeModelo","nomeMarca","placaCarro","anoCarro","nomeCor","nomeMecanico","nomePeca",
            "obsConserto","valorConserto", "previsaoConserto","dataConserto","confirmacaoConserto"
            from public."Conserto"
            inner join public."Carro" C on C."idCarro" = "Conserto"."idCarro"
            inner join public."Modelo" M on M."idModelo" = C."idModelo"
            inner join public."Marca" A on A."idMarca" = M."idMarca"
            inner join public."Cor" W on W."idCor" = C."idCor"
            inner join public."Mecanico" N on N."idMecanico" = "Conserto"."idMecanico"
            inner join public."Peca" P on P."idPeca" = "Conserto"."idPeca"
            where C."placaCarro" = '${req.params.placa}'`)
            .then(data => {
                carros[0].carro = data.rows[0].nomeModelo
                carros[0].placa = data.rows[0].placaCarro
                carros[0].ano = data.rows[0].anoCarro
                carros[0].cor = data.rows[0].nomeCor 

                carros[0].previsao = data.rows[0].previsaoConserto
                carros[0].dataFinal = data.rows[0].dataConserto
                for(row of data.rows){
                    if(carros[0].previsao < row.previsaoConserto){
                        carros[0].previsao = row.previsaoConserto
                    }
                    if(carros[0].dataFinal < row.dataConserto){
                        carros[0].dataFinal = row.dataConserto
                    }
                }
                carros[0].previsao = Date.parse(carros[0].previsao)
                if(carros[0].dataFinal != null){
                    carros[0].dataFinal = Date.parse(carros[0].dataFinal)
                }
            })
            .catch(err => res.status(400).json(err))

            await app.db.raw(`select "nomeMecanico","nomePeca",
            "obsConserto","valorConserto","confirmacaoConserto"
            from public."Conserto"
            inner join public."Carro" C on C."idCarro" = "Conserto"."idCarro"
            inner join public."Mecanico" N on N."idMecanico" = "Conserto"."idMecanico"
            inner join public."Peca" P on P."idPeca" = "Conserto"."idPeca"
            where C."placaCarro" = '${req.params.placa}'`)
            .then(data => {
                for(row of data.rows){
                    carros.push(row)
                }
                console.log(carros)
                res.json(carros)
            })
            .catch(err => res.status(400).json(err))
        }
    }

    return { postOrcamento, getOrcamento }
}