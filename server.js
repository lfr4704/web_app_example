//create package jsaon to save all dependencies first by typing the following in command line: (npm init --yes) to create default package
//then install express.js dependency (npm install -S express) or (npm install express --save) "-S" saves the dependency to json package
//then create gitignore file. refer to this link for how to create file in windows https://stackoverflow.com/questions/10744305/how-to-create-gitignore-file
//then install nodemon (npm install -g nodemom) "-g" means globally so it can be used no matter what project you are working on 
//then install socket.io (npm install -s socket.io)  socket allows you to connect both frontend and backend
//then install mongoose (npm install -s mongoose) Mongoose is a database that works with mongoDB
let express = require('express');
let bodyParser = require('body-parser');
let app = express();  //this sets reference to an instance of express
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let dbUrl = 'mongodb://user:user@ds231719.mlab.com:31719/learning-node';

let Message = mongoose.model('Message', { 
	name: String,
	message: String
});

app.get('/messages', (req, res) =>{
	Message.find({}, (err, messages)=>{
		res.send(messages);
	});
	
});

app.post('/messages', async (req, res) =>{
	let message = new Message(req.body);

//promise starts here
	let savedMesaage = await message.save()

	console.log('saved');

	let censored = await Message.findOne({message: 'badword'});
	
		if(censored)
			await Message.remove({_id: censored.id});
		else 
			io.emit('message', req.body);
		
		res.sendStatus(200);
	
	//.catch((err) =>{
	//	res.sendStatus(500);
	//	return console.error(err);
	//});

});


io.on('connection', (socket)=>{
console.log('a user connected');
});


mongoose.connect(dbUrl, (err) =>{
	console.log('mongoDB connection', err);
});

//for windows to run "localhost:3000/messages" the server.js needs be running in the command line "node server.js"
let server = http.listen(3000, () => {
    
    console.log("server is listening on port", server.address().port);
});