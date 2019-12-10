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
                { aberto: true}
            ],
        })

        let resul = await List.listItems(vagas.reverse(), req.query.pg, req.query.vs)
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
            aberto: true
        })

        return res.json(vaga)
    },

    async fechar(req,res){
        const { vagId } = req.params
        const vaga = await Vaga.findByIdAndUpdate(vagId, {$set: {aberto: false}}, {new: true})
        return res.json(vaga)
    },

    async matchs(req, res){
        const { user } = req.headers
        const devs = await Dev.find({matchs: user})
        let resul = await List.listItems(devs.reverse(), req.query.pg, req.query.vs)
        return res.json(resul)
    },

    async vag(req,res){

        const {user} = req.headers
        const emp = await Vaga.findById(user)
        if(emp){
            return res.json(emp)
        }else{
            return res.json({erro: "Sem user"})
        }
    }

}