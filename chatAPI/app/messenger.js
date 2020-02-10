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
    if(req.query.datetime){
        const date = new Date(req.query.datetime);
        if (isNaN(date.getDate())){
            res.status(400).send({'error': 'Incorrect date'});
        } else{
            let datetime = req.query.datetime;
            let newMessages = await fileDb.getUpdatedMessages(datetime);
            res.send(newMessages);
        }
    } else{
        let data = await fileDb.getMessages();
        res.send(data);
    }
});


module.exports = router;
