var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3002;
require('dotenv').load();


app.get("/data", function (req, res) {
    var business_name = req.query.name;
    var contactNum = req.query.contact_number;
    var contacNam = req.query.contact_name;
    var contactEml = re.query.contact_email;
    let jsonObj = { data: `${business_name} ${contactNum} ${contacNam} ${contactEml}` };
    console.log("jsonObj", jsonObj);
    res.send(jsonObj);
    console.log("hey", req.body)
});
app.post('/data', function (req, res, next) {
    var jsonObj = { "data": req.body.name + ' ' + req.body.contact_number + '' + req.body.contact_name + '' + contact_email }
    console.log("red.body is now called like it should", jsonObj)
    res.json(jsonObj);
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});