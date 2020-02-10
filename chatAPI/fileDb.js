const fs = require('fs');
const nanoid = require('nanoid');

const readFile = filename => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err){
                reject(err);
            } else{
                resolve(data);
            }
        })
    })
};

const writeFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, err => {
            if(err) {
                reject(err);
            } else{
                resolve();
            }
        })
    })
};

const filename = './db.json';
let data = [];

module.exports = {
    async init(){
        try{
            const fileContents = await readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch(err){
            data = [];
        }
    },
    async getMessages(){
        let newData = [...data];
        const lastThirty = newData.length < 30 ? newData.length : 30;
        newData.sort((a, b) => {
            return a.datetime < b.datetime ? 1 : -1;
        });
        return newData.slice(0, lastThirty);
    },
    async getUpdatedMessages(datetime){
        let allData = data.map(m => ({...m, datetime: new Date(m.datetime).getTime()}));
        return allData.filter(message => (message.datetime > new Date(datetime).getTime())).map(m => ({...m, datetime: new Date(m.datetime)}));
    },
    async addMessage(message){
        const date = new Date();
        message.datetime = date.toISOString();
        message.id = nanoid();
        data.push(message);
        await this.save();
    },
    async save(){
        const fileContents = JSON.stringify(data, null, 2);
        await writeFile(filename, fileContents);
    },


};
