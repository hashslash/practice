const app = require('express')()
const { setQueues, router } = require('bull-board')
const Queue = require('bull')

const MapQueue = new Queue("MapQueue", { redis: { port: 6379, host: '127.0.0.1', password: 'password' } })
const MapQueue2 = new Queue("MapQueue2", { redis: { port: 6379, host: '127.0.0.1', password: 'password' } })

setQueues([MapQueue,MapQueue2])

MapQueue.process(async (job, done) => {
    console.log("starting");
    let i=0;
    const yes = ()=>{
        i++;
        job.progress(i);
        if(i<100)setTimeout(yes,1000);
        else done();
    }
    setTimeout(yes,1000);
})

MapQueue2.process(async (job, done) => {
    console.log("starting");
    let i=0;
    const yes = ()=>{
        i+=10;
        job.progress(i);
        if(i<100)setTimeout(yes,1000);
        else done();
    }
    setTimeout(yes,1000);
})

app.get('/add/:id', (req, res) => {
    MapQueue.add( { title: req.params.id });
    MapQueue2.add( { title: req.params.id });
    res.end("cool");
})

app.use('/ui', router);
app.listen(8080);