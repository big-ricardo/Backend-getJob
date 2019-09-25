const axios = require('axios')
const Emp = require('../model/Emp')
const Vaga = require('../model/Vaga')
const Dev = require('../model/Dev')
const List = require('./listItems')

module.exports = {

    async index(req, res) {
        const { user } = req.headers

        const loggedUser = await Dev.findById(user)
        const vagas = await Vaga.find({
            $and: [
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.deslikes } },
            ],
        })

        let resul = await List.listItems(vagas, req.query.pg, req.query.vs)
        return res.json(resul)
    },

    async store(req, res) {

        const { id,cidade,emailC } = req.body;

        const {avatar} = await Emp.findOne({ _id:id });
        const {user} = await Emp.findOne({ _id:id });

        const { atuacao,descricao} = req.body 

        const vaga = await Vaga.create({
            atuacao,
            user,
            descricao,
            idEmp: id,
            avatar,
            cidade,
            emailContato:emailC,
            
        })

        return res.json(vaga)
    },

    async matchs(req, res){
        const { user } = req.headers
        const devs = await Dev.find({matchs: user})
        return res.json(devs)
    },

    async vag(req,res){

        const {user} = req.headers
        const emp = await Vaga.findById(user)
        return res.json(emp)
    }

}
2