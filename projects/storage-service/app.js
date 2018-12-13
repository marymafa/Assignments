var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const PORT = 3002;
const { Client } = require('pg');
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const bcrypt = require('bcrypt');
const salt = 10;
const passport = require('passport');

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(passport.initialize());
app.use(passport.session());
const client = new Client({
    connectionString: connectionString,
})
client.connect();

require('./routes/ passport')(passport);
require('./routes/findUsers')(app);
require('./routes/loginUser')(app);
require('./routes/registerUser')(app);


app.get("/data", async (req, res) => {
    var data = await client.query(`SELECT * FROM businesses`)
    res.send(data.rows).status(201).end();
});

app.get("/locationData", async (req, res) => {
    console.log('req.params :', req.params);
    var locationData = await client.query('SELECT *   FROM locations');
    console.log("location", locationData)
    res.send(locationData.rows).status(201).end();
});

app.get("/locationData/:selectedValue", async (req, res) => {
    console.log('req.params :', req.params);
    var locationData = await client.query('SELECT *  FROM units INNER JOIN blocks ON units.blocks_id = blocks.id INNER JOIN locations ON blocks.locations_id = locations.id  WHERE locations.address = $1', [req.params.selectedValue])
    console.log("location", locationData)
    res.send(locationData.rows).status(201).end();
});

app.get('/loginData', async (req, res, next) => {
    var unitsData = await client.query(`SELECT * FROM cunstomer`)
    res.send(unitsData.rows[0]).status(201).end();
})

app.get('/blockData', async (req, res) => {
    var blockData = await client.query(`SELECT * FROM blocks`)
    res.send(blockData.rows).status(201).end();
});

app.get('/unitTypesData', async (req, res) => {
    var unitTypesData = await client.query('SELECT * FROM units_type ')
    res.send(unitTypesData.rows).status(201).end();
});

app.get('/unitsData/:selectedValue', async (req, res) => {
    var unitsData = await client.query('SELECT * FROM units   INNER JOIN units_type ON units_type.id = units.units_type_id')
    res.send(unitsData.rows).status(201).end();
});

app.get('/unitsData', async (req, res) => {
    console.log("mary are you happy?");
    var unitsData = await client.query('SELECT * FROM units')
    res.send(unitsData.rows).status(201).end();
})

// post

app.post('/data', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

