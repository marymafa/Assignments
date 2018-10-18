var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
const PORT = 3002;
const { Client } = require('pg');
const connectionString = 'postgres://postgres:mm1995@localhost:5432/units'

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const client = new Client({
    connectionString: connectionString,
})
client.connect();
app.get("/data", async function (req, res) {
    var data = await client.query(`SELECT * FROM businesses`)
    res.send(data.rows).status(201).end();
});

app.get("/locationData", async function (req, res) {
    console.log("gaibo")
    var locationData = await client.query(`SELECT * FROM locations`)
    res.send(locationData.rows).status(201).end();
});

app.post('/data', function (req, res) {

    client.query(`INSERT INTO businesses(name,contact_name,contact_email,contact_number) VALUES('${req.body.name}' , ' ${req.body.contact_name}' , ' ${req.body.contact_name}' , ' ${req.body.contact_number}')`, (err, res) => {
        console.log(err, res)
        client.end()
    })
    res.status(201).end()
});


app.post('/locationData', function (req, res) {
    console.log("hella")
    client.query(`INSERT INTO locations(address,businesses_id) VALUES(' ${req.body.address}')`, (err, res) => {
        console.log(err, res)
        client.end()
    })
    res.status(201).end()
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
