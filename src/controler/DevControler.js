const axios = require('axios')
const Dev = require('../model/Dev')
const Vaga = require('../model/Vaga')
const List = require('./listItems')

module.exports = {

    async index(req, res) {
        const { user } = req.headers

        const loggedUser = await Vaga.findById(user)
        const devs = await Dev.find({
            $and: [
                {likes: user},
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.deslikes } },
            ],
        })

        let resul = await List.listItems(devs, req.query.pg, req.query.vs)
        return res.json(resul)
    },

    async store(req, res) {

        const { user,senha } = req.body;

        const userExist = await Dev.findOne({ user});
        if (userExist) {
            if(userExist.senha == senha){
                console.log(user , "entrou")
                return res.json(userExist)
            }else{
                return res.json({ message: "senhaErrada"})
            }
        }

        const response = await axios.get(`https://api.github.com/users/${user}`)

        const { name, bio, avatar_url: avatar,location: cidade,public_repos: repositorios, email } = response.data
        
        const dev = await Dev.create({
            name,
            user,
            bio,
            avatar,
            cidade,
            repositorios,
            email,
            senha,
        })
        console.log(user , " criado")

        return res.json(dev)
    },

    async matchs(req, res){
        const { user } = req.headers

        const devs = await Vaga.find({matchs: user})
        let resul = await List.listItems(devs, req.query.pg, req.query.vs)
        return res.json(resul)
    },

    async dev(req,res){

        const {user} = req.headers
        const dev = await Dev.findById(user)
        return res.json(dev)
    }

}