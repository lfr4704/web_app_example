//create package jsaon to save all dependencies first by typing the following in command line: (npm init --yes) to create default package
//then install express.js dependency (npm install -S express) or (npm install express --save) "-S" saves the dependency to json package
//then create gitignore file. refer to this link for how to create file in windows https://stackoverflow.com/questions/10744305/how-to-create-gitignore-file

let express = require('express');
let bodyParser = require('body-parser');
let app = express();  //this sets reference to an instance of express

app.use(express.static(__dirname));
app.use(bodyParser.json());

let messages = [
{ name: 'Tim', message: 'Hi'},
{ name: 'Jane', message: 'Hello'}
];


app.get('/messages', (req, res) =>{
	res.send(messages);
});

app.post('/messages', (req, res) =>{
	console.log(req.body);
	res.sendStatus(200);
});

//for windows to run "localhost:3000/messages" the server.js needs be running in the command line "node server.js"
let server = app.listen(3000, () => {
    
    console.log("server is listening on port", server.address().port);
});