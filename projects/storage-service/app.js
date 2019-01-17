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
    var data = await client.query('SELECT * FROM locations')
    res.send(data.rows).status(201).end();
});

app.get('/loginData', async (req, res, next) => {
    var unitsData = await client.query('SELECT * FROM customer INNER JOIN customer_units ON  customer.id = customer_units.customer_id INNER JOIN units ON customer_units.unit_id = units.id INNER JOIN  units_type ON units. units_type_id = units_type.id')
    console.log("unitsData", unitsData);
    res.send(unitsData.rows).status(201).end();
})

app.get('/blockData', async (req, res) => {
    var blockData = await client.query(`SELECT * FROM blocks`)
    res.send(blockData.rows).status(201).end();
});


app.get('/unitTypesData/:unitType', async (req, res) => {

    var selectedUnitTypes = req.params.unitType.split(" ")
    var unitsDetails = await client.query('SELECT * FROM units')
    console.log('what is unitsD', unitsDetails)
    var unitTypeDetails = await client.query('SELECT * FROM units_type')
    var unitType = unitTypeDetails.rows
    var units = unitsDetails.rows;
    var results = unitType.find(item => {
        var returningObjects = item.name === selectedUnitTypes[0] && item.length === selectedUnitTypes[1] && item.width === selectedUnitTypes[2] && item.height === selectedUnitTypes[3]
        return returningObjects
    })
    var allAvailableUnits = units.filter(unit => {
        var foundId = unit.unit_type_id
        if (foundId === results.id) {
            return unit.name
        }
    }).map(units => {
        return units.name
    })
    try {
        res.send(allAvailableUnits).status(201).end()

    } catch (error) {
        res.status(500).end()
    }
});

app.get('/unitsData/:unit', async (req, res) => {
    var unitsData = await client.query('SELECT * FROM units')
    res.send(unitsData.rows).status(201).end();
})
app.get('/RentAUnit/:email', async (req, res) => {
    console.log("params", req.params.email)
    var customerUnits = await client.query(`SELECT * FROM customer 
    INNER JOIN customer_units ON  customer.id = customer_units.customer_id INNER JOIN 
    units ON customer_units.unit_id = units.id INNER JOIN  units_type ON units. 
    units_type_id = units_type.id WHERE customer.email = $1` , [req.params.email])
    console.log("customer", customerUnits)
    res.send(customerUnits.rows).status(201).end();
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
    console.log(" business loctions", req.body);
    client.query('INSERT INTO locations(address,country,businesses_id) VALUES($1,$2,$3)', [req.body.address, req.body.country, req.body.businesses_id], (err, res) => {
        console.log(err, res)
    })
    res.status(201).end()
});

app.post('/blockData', function (req, res) {
    console.log("block details", req.body.locations_id);
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

app.post('/RentAUnit', function (req, res) {
    var userEmailId = 0;
    client.query('SELECT id FROM customer WHERE email = $1', [req.body.customerEmail], (err, res) => {
        if (err) return err;
        userEmailId = res.rows[0].id
    });
    client.query('INSERT INTO customer_units(customer_id, unit_id) VALUES ($1,$2)', [userEmailId, +req.body.unit_id], (err, res) => {
        if (err) return err;
        console.log(res);
    });
    res.status(201).end()
})

app.post('/unitsData', function (req, res) {
    console.log("unit details", req.body);
    client.query('INSERT INTO  units(unit_name,blocks_id,units_type_id) VALUES($1,$2,$3)', [req.body.unit_name, Number(req.body.blocks_id), Number(req.body.units_type_id)], (err, res) => {
        console.log("res", res, err);
    })
    return res.status(201).end()

});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

