var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const PORT = 3002;
const { Client } = require('pg');
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';

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
//get
app.get("/data", async function (req, res) {
    var data = await client.query(`SELECT * FROM businesses`)
    res.send(data.rows).status(201).end();
});

app.get("/locationData", async function (req, res) {
    var locationData = await client.query('SELECT * FROM locations ')
    res.send(locationData.rows).status(201).end();
});

app.get('/blockData', async function (req, res) {
    var blockData = await client.query(`SELECT * FROM blocks`)
    res.send(blockData.rows).status(201).end();
});

app.get('/unitTypesData', async function (req, res) {
    var unitTypesData = await client.query('SELECT * FROM units_type ')
    res.send(unitTypesData.rows).status(201).end();
});

app.get('/unitsData', async function (req, res) {
    console.log("mary are you happy?");
    var unitsData = await client.query(`SELECT * FROM units`)
    res.send(unitsData.rows).status(201).end();
})

app.get('/customerData', async function (req, res) {
    console.log("this is my customer's details");
    var unitsData = await client.query(`SELECT * FROM customer`)
    res.send(unitsData.rows).status(201).end();
});

// post
app.post('/data', function (req, res) {
    console.log("business details", req.body);
    client.query('INSERT INTO businesses(name,contact_name,contact_email,contact_number) VALUES($1,$2,$3,$4)', [req.body.name, req.body.contact_name, req.body.contact_email, req.body.contact_number], (err, res) => {
        console.log(err, res)
    })
    res.status(201).end()
});

app.post('/locationData', function (req, res) {
    console.log("location details", req.body);
    client.query('INSERT INTO locations(address,country,businesses_id) VALUES($1,$2,$3)', [req.body.address, req.body.country, req.body.businesses_id], (err, res) => {
        console.log(err, res)
    })
    res.status(201).end()
});

app.post('/blockData', function (req, res) {
    console.log("block details", req.body);
    client.query('INSERT INTO blocks(name,locations_id) VALUES($1,$2)', [req.body.name, req.body.locations_id], (err, res) => {
        console.log(err, res)
    })
    res.status(201).end()
})

app.post('/unitTypesData', function (req, res) {
    console.log("unit type details", req.body);
    client.query('INSERT INTO units_type(name,length,height,width) VALUES($1,$2,$3,$4)', [req.body.name, req.body.length, req.body.height, req.body.width], (err, res) => {
        console.log(err, res)
    })
    res.status(201).end()
});

app.post('/unitsData', function (req, res) {
    console.log("unit details", req.body);
    client.query('INSERT INTO  units(name,blocks_id,units_type_id) VALUES($1,$2,$3)', [req.body.name, req.body.blocks_id, req.body.units_type_id], (err, res) => {
        console.log(err, res)
    })
    res.status(201).end()
});

app.post('/customerData', function (req, res) {
    console.log("customer details", req.body);
    console.log("this is my customer's details", req.body);
    client.query('INSERT INTO  customer(username,email,password) VALUES($1,$2,$3)', [req.body.username, req.body.email, req.body.password], (err, res) => {
        console.log(err, res)
    })
    res.status(201).end()
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

