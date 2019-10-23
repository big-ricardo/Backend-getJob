const express = require('express');
const router = express.Router();
const DevControler = require('./controler/DevControler')
const LikeControler = require('./controler/LikeControler')
const DeslikeControler = require('./controler/DeslikeControler')
const multer = require('multer')
const multerConfig = require('../src/model/multer')
const ImageControler = require('./controler/ImageControler')
const EmpControler = require('./controler/EmpControler')
const VagaControler = require('./controler/VagaControler')
const MessageControler = require('./controler/MessageControler')

const LikeControlerDev = require('./controler/LikeControlerDev')
const DeslikeControlerDev = require('./controler/DeslikeControlerDev')

router.get('/', (req, res) => {

    return res.json({ message: `Muito Bem!Tudo funcionando!!!` });
});

router.post('/devs', DevControler.store)
router.get('/devs', DevControler.index)
router.get('/matchs', DevControler.matchs)
router.get('/matcs', VagaControler.matchs)
router.post('/devs/:devId/likes', LikeControler.store)
router.post('/devs/:devId/deslikes', DeslikeControler.store)
router.get('/devLog', DevControler.dev)
router.get('/empLog', EmpControler.emp)
router.get('/vagLog', VagaControler.vag)
router.post('/emps', EmpControler.store)
router.get('/emps', EmpControler.index)
router.post('/upload', multer(multerConfig).single('file'), ImageControler.store)

router.post('/vags', VagaControler.store)
router.get('/vags', VagaControler.index)
router.post('/vags/:empId/likes', LikeControlerDev.store)
router.post('/vags/:empId/deslikes', DeslikeControlerDev.store)

router.post('/mess/:Id', MessageControler.store)
router.get('/mess/:Id', MessageControler.index)

router.get('/teste', (req,res) => {
    let itens = []
    
    for(i =0; i<10; i++){
        itens[i] = i
    }

    function listItems(items, pageActual, limitItems){
        let result = [];
        let totalPage = Math.ceil( items.length / limitItems );
        let count = ( pageActual * limitItems ) - limitItems;
        let delimiter = count + limitItems;
        
        if(pageActual <= totalPage){
            for(let i=count; i<delimiter; i++){
                if(items[i] != null){
                    result.push(items[i]);
                }
                count++;
            }
        }
    
        return result;
    };

    let resul = listItems(itens, req.query.v, 2)

    return res.json({mess: resul})
})

module.exports = router;