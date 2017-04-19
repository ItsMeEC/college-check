var express = require('express'),
var mongoose =require('mongoose');
var db = mongoose.connect('mongodb://localhost/college/');
var Col = require('./models/collegeModel');
var bodyParser = require('body-parser');
const passport = require('passport');

var app = express();

const users = require('./routes/users');

var port = process.env.PORT||3000; 
var commanRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/users', users);

commanRouter.route('/getColleges')
    .get(function(req,res){
		Col.find(function(err,data){
			if(err)
			   res.status(500).send(err);
			else
				res.json(data);
		})
});

app.use('/api', commanRouter);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
	res.send('welcome to my api');
});

app.listen(port, function(){
	console.log("running");
});