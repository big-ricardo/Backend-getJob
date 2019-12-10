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
const MeuSite = require("./controler/MeuSite")

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

router.put('/vags/:vagId', VagaControler.fechar)

router.get('/falei', MeuSite.index)
router.post('/fale', MeuSite.store)

module.exports = router;