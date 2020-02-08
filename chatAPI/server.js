const express = require('express');
const cors = require('cors');
const messenger = require('./app/messenger');
const fileDb = require('./fileDb');
const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messenger);
const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log('Server is running on port: ' + port);
    });
};

run().catch(err => console.error(err));
