const express = require("express");
const router = express.Router();
const {form, getForm} = require('../controllers/form')

router.post('/form' , form)
router.get('/form' , getForm)

module.exports = router;