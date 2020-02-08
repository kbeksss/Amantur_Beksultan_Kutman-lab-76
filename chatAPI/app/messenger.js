const express = require('express');
const fileDb = require('../fileDb');
const router = express.Router();

router.post('/', async (req, res) => {
    if(req.body.author && req.body.message){
        res.send(req.body);
        await fileDb.addMessage(req.body);
    } else{
        res.status(400).send({"error": "Author and message must be present in the request"});
    }
});
router.get('/', async (req, res) => {
    let data = await fileDb.getMessages();
    res.send(data);
});

module.exports = router;
