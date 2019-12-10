const Emp = require('../model/Emp')
const Vaga = require('../model/Vaga')
const List = require('./listItems')

module.exports = {

    async index(req, res) {
        const { user } = req.headers
        const users = await Vaga.find({ idEmp: user })
        let resul = await List.listItems(users.reverse(), req.query.pg, req.query.vs)
        return res.json(resul)
    },


    async store(req, res) {

        const {type } = req.body;

        if(type == true){
            const {username,senha} = req.body
            const userExist = await Emp.findOne({ user: username});

            if (userExist) {
                if(userExist.senha == senha){
                    const avat = userExist.avatar
                    userExist.avatar = avat
                    return res.json(userExist)
                }else{
                    return res.json({ message: "Senha errada"})
                }
            }
        }else{
            const { user,cidade, email, avatar,senha} = req.body
            const avat = 'https://getjobserver.herokuapp.com/image/' + avatar
            const emp = await Emp.create({
                user,
                avatar: avat,
                cidade,
                email,
                senha
            })

            return res.json(emp)
        }
    },

    async emp(req,res){

        const {user} = req.headers
        const emp = await Emp.findById(user)
        return res.json(emp)
    }

}
