import express from 'express'
import {MongoClient} from 'mongodb'
import bodyParser from 'body-parser'

const app = express();
const url = 'mongodb://localhost:27000/aphorisms';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/random-aphorism', (req, res) => {
    MongoClient.connect(url, (connectError, db) => {
        if (connectError) throw new Error(connectError);

        const collection = db.collection('aphorisms');

        collection.find({}).toArray((findError, aphorisms) => {
            if (findError) throw new Error(findError);
            db.close();

            const aphorism = aphorisms[Math.floor(Math.random() * aphorisms.length)];
            res.json(aphorism)
        });
    });
});

app.post('/add-aphorism', (req, res) => {
    MongoClient.connect(url, function(connectError, db) {
        if (connectError) throw new Error(connectError);

        var collection = db.collection('aphorisms');

        var text = req.body.text;

        collection.insertOne({text: text, author: 'Giga'}, function(findError) {
            if (findError) throw new Error(findError);
            db.close();
            res.json({ok: 'ok'});
        });
    });
});

app.get('/load-grid', (req, res) => {
    MongoClient.connect(url, function(connectError, db) {
        if (connectError) throw new Error(connectError);

        var  collection = db.collection('aphorisms');

        collection.find({}).toArray((findError, aphorisms) => {
            if (findError) throw new Error(findError);
            db.close();

            const aphorism = aphorisms;
            res.json(aphorism)
        });
    });
});


app.post('/edit-aphorism', (req, res) => {
    MongoClient.connect(url, function (connectError, db) {
        if (connectError) throw new Error(connectError)

        var collection = db.collection('aphorisms')

        var id = req.body.id

        var text = req.body.text

       // var author = req.body.author

        collection.insertOne({_id: id, text: text}, function (findError) {
            if (findError) throw new Error(findError)
            db.close()
            res.json({ok: 'ok'})
        })

app.post('del-aphorism', (req, res) => {
    MongoClient.connect(url, function (connectError, db) {
        if (connectError) throw new Error(connectError)

        var collection = db.collection('aphorisms')

        var id = req.body.id

        collection.remove({_id: id})

    })
})

    })
})

const port = 3000
app.listen(port, () =>
    console.log('work on port' + port)
)

