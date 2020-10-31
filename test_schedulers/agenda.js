// setup
const Agenda = require('agenda');
const Express = require('express');
const Agendash = require('agendash');
const { MongoClient } = require('mongodb');
const Mongo = require("mongodb").MongoClient;
const app = Express();
let agenda,mongoClient;
(async () => {
    mongoClient = await Mongo.connect('mongodb://root:root@localhost:27017', { useUnifiedTopology: true });
    agenda = new Agenda({ mongo: mongoClient.db('agenda') });
    app.use('/', Agendash(agenda));
    app.listen(8080);

    //schedule
    agenda.processEvery('5 second');
    agenda.define('Print HW', (job) => {
        console.log('HW');
    });

    console.log('Starting...')
    await agenda.start();
    await agenda.every('5 seconds', 'Print HW');
})();

// exit
async function graceful() {
    try{
    console.log('Stopping gracefully');
    await agenda.stop();
    process.exit(0);
    }
    catch(e){
        console.log(e);
    }
}
process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);