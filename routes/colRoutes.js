var express = require('express');
var routes = function(Col){

	var colRouter = express.Router();

	colRouter.route('/')
	.post(function(req,res){
		var col = new col(req.body);
		console.log(col);
		col.save();
		res.status(201).send(col);

	})
	.get(function(req,res){ 
		var query =req.query;
		col.find(query, function(err,books){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}else{
				res.json(col);
			}
		});
	});

	colRouter.use('/:colId',function(req,res,next){
		col.findById(req.params.colId, function(err,book){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}else if(col){
				req.col = col;
				next();
			}else{
				res.status(404).send("no college found");
			}
		})
	});

	bookRouter.route('/:colId')
	.get(function(req,res){
		res.json(req.col);
	})
	.put(function(req,res){
		
		req.col.col_name = req.col.col_name;
		req.col.state = req.col.state;
		req.col.website = req.col.website;
		req.col.twitter = req.col.twitter;
		req.col.facebook = req.col.facebook;
		req.col.instagram = req.col.instagram

		req.col.save(function(err){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}else{
				res.json(req.col);
			}
		});

	})
	.patch(function(req,res){
		if(req.body._id)
			delete req.body._id;
		for(var p in req.body){
			req.col[p] = req.body[p];
		}
		req.col.save(function(err){
			if(err){
				console.log(err);
				res.status(500).send(err);
			}else{
				res.json(req.col);
			}
		});
	})
	.delete(function(req,res){
		req.col.delete(function(err){
			if(err){
				res.status(500).send(err);
			}else{
				res.status(204).send("removed");
			}
		})
	});
	return colRouter;
};

module.exports = routes;