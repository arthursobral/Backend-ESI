module.exports = app => {
    const postOrcamento = async (req,res) => {
        const cliente = await app.db('Cliente')
                            .where({nomeCliente: req.body.nome})
                            .then(id => {return id})
                            .catch(err => res.status(400).json(err))

        if(cliente.length > 0){
            const aux = await app.db('Carro')
                .where({idCliente: cliente[0].idCliente, placaCarro: req.body.placa})
                .then(data => {return data})
                .catch(err => res.status(400).json(err))
            
            const mec = await app.db('Mecanico')
                .where({nomeMecanico: req.body.mecanico})
                .then(mec => {
                    return mec[0].idMecanico
                })
                .catch(err => res.status(400).json(err))

            const peca = await app.db('Peca')
                .where({nomePeca: req.body.peca})
                .then(mec => {
                    return mec[0].idPeca
                })
                .catch(err => res.status(400).json(err))
            
            
            await app.db('Conserto')
                .insert({idCarro: aux[0].idCarro, idMecanico: mec, idPeca: peca, obsConserto: req.body.obs,
                    valorConserto: req.body.valor,previsaoConserto: req.body.previsao})
                .then(res.status(200).send('Registro de manutencao feito'))
                .catch(err => res.status(400).json(err))
            
        }else{
            return res.send('Cliente nao encontrado')
        }
    }

    const getOrcamento = async (req, res) => {
        const carros = {
            carro: undefined,
            placa: undefined
        }

        let valorTotal = 0.0;    
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
            const consertos = await app.db('Conserto')
                .where({idCarro: aux[0].idCarro})
                .then(conserto => {return conserto})
                .catch(err => res.status(400).json(err))

            for(conserto of consertos){
                await app.db('Carro')
                .where({idCarro: conserto.idCarro})
                .then(carro => {
                    carros.carro = carro[0].idModelo
                    carros.placa = carro[0].placaCarro
                })
                .catch(err => res.status(400).json(err))
                
                await app.db('ModeloCarro')
                    .where({idModelo: carros.carro})
                    .then(modelo => {
                        carros.carro = modelo[0].nomeModelo;
                    })
                    .catch(err => res.status(400).json(err))

                conserto.idCarro = carros

                await app.db('Mecanico')
                    .where({idMecanico: conserto.idMecanico})
                    .then(mec => {
                        conserto.idMecanico = mec[0].nomeMecanico
                    })
                    .catch(err => res.status(400).json(err))

                await app.db('Peca')
                    .where({idPeca: conserto.idPeca})
                    .then(mec => {
                        conserto.idPeca = mec[0].nomePeca
                    })
                    .catch(err => res.status(400).json(err))
                    
                valorTotal += conserto.valorConserto
            }
            console.log(valorTotal + 200.00)
            consertos.push({valorTotal: valorTotal})
            res.json(consertos)
        }
    }

    return { postOrcamento, getOrcamento }
}