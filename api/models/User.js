/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    firstname : { type: 'string' },

    lastname : { type: 'string' },

    rollnumber : { type: 'string' },

    email : { type: 'string' },

    password : { type: 'string' }
  },


  signup: function(data, cb){
  	User.findOne({$or:[ {email : data.email}, {rollnumber: data.rollnumber}]} ).exec(function (err, result){
  	  if (!err && result)
  	    cb("Email or Rollnumber Exist", err);
  	  
  	  else if(result==undefined){
  	  	User.create(data).exec(function (err, newresult){
  	  	 
  	  	   cb("Succefully Regsiter", err); 
  	  	});
  	  }
  	  
    });
  },



  login: function(data, cb){
  	User.findOne({$and:[{rollnumber: data.rollnumber},{password : data.password}]}).exec(function(err, result){
  		if(!err && result){
			   cb(true);
  		}
  		else if(err){
        cb(err);
  		}
  		else
  			cb(result);
  	});
  },


  show: function(cb){
    User.find().exec(function(err, result){

        cb(result, err);
    });
  },


  del: function(data, cb){
    User.destroy({"rollnumber":data.rollnumber}).exec(function(err, result){
   
      cb(result, err);
    });
  },




  get: function(data, cb){
      User.findOne({rollnumber: data.rollnumber}).exec(function(err, result){

          cb(err, result);
      });
  },



  edit: function(data, cb){;
      User.update({"rollnumber": data.body.rollnumber},{"firstname": data.body.firstname, "lastname": data.body.lastname, "email": data.body.email}).exec(function(result, err){
        
        cb(err, result);
      });
  },



};




