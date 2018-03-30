//create package jsaon to save all dependencies (npm init --yes) to create default package
//then install express.js dependency (npm install -s express) "-s" saves the dependency to json package

let express = require('express');
let app = express();

app.use(express.static(__dirname));

var messages = [
{ name: 'Tim', message: 'Hi'},
{ name: 'Jane', message: 'Hello'}
]


app.get('/messages', (req, res) =>{
	res.send('messages!')
});



let server = app.listen(3000, () => {
    
    console.log("server is listening on port", server.address().port)
});