var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
    
var collegeModel = new Schema({
	college_name:{type:String},
	state:{type:String},
	value:{type:String},
	website:{type:String},
	twitter:{type:String},
	facebook:{type:String},
	instagram:{type:String}

    
	
});

module.exports = mongoose.model('College', collegeModel, 'fullCollegeDatabase');