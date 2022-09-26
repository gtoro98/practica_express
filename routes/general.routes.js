const path = require("path")
const express = require("express")
const members = require("../members")
const controler = require("../controllers/members.controller")
const  {logger}  = require("../middleware");
const router = express.Router();


router.get('/', [logger.log],(req, res) =>{
    
    res.sendFile(path.join(path.dirname(require.main.filename), 'public', 'index.html'))
})

router.get('/about', (req, res) =>{
    res.sendFile(path.join(path.dirname(require.main.filename), 'public', 'about.html'))
})

module.exports = router