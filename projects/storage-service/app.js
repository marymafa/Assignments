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

app.get("/data", function (req, res) {

    const client = new Client({
        connectionString: connectionString,
    })
    client.connect();

    client.query('SELECT * FROM businesses WHERE id =id', (err, res) => {
        console.log(err, res)
        client.end()
    })

});
app.post('/data', function (req, res) {
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect();

    client.query(`INSERT INTO businesses(name,contact_name,contact_email,contact_number) VALUES('${req.body.name}' , ' ${req.body.contact_name}' , ' ${req.body.contact_name}' , ' ${req.body.contact_number}')`, (err, res) => {
        console.log(err, res)
        client.end()
    })
    res.status(201).end()
});



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
