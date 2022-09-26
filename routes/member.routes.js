const path = require("path")
const express = require("express")
const members = require("../members")
const controler = require("../controllers/members.controller")
const  {logger}  = require("../middleware");
const router = express.Router();


router.get('/', controler.getMembers)
router.get('/:id', controler.getMembersById)
router.post('/', controler.createMember)
router.delete('/:id', controler.deleteMember)
router.put('/:id', controler.updateMember)


module.exports = router