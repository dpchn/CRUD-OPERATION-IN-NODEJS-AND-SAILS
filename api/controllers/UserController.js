/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



var UserController={
	
  /**
   * `UserController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },

  /**
   * `UserController.create()`
   */
  signup: function (req, res) {
    var result = UserController.check(req, res);
    if(result)
      return res.badRequest(result);
                            
    User.signup({firstname : req.body.firstname, lastname : req.body.lastname, email : req.body.email, rollnumber : req.body.rollnumber, password : req.body.password}, function(result, err){
    if(err)
        return res.negotiate(err);
    res.view("notification",{result:result});
    });
  },



    /**
   * `UserController.login()`
   */
  login: function (req, res) {
    if(!req.body.rollnumber || !req.body.password)
        return res.badRequest({"message": "rollnumber/password missing"});

    User.login({rollnumber : req.body.rollnumber, password : req.body.password},function(result,err){
        if(!err && result)
            res.redirect('/show');
        else if(result==undefined)
          res.send("Rollnumber/Password wrong");
        else
            res.negotiate(err);
    });

  },



  /**
   * `UserController.show()`
   */
  show: function (req, res) {
      User.show(function(result, err){
        if(!err && result){
          res.view("alldata",{result:result});
        }
        else{
          res.negotiate({"err":"Error"});
        }
      });
  },


  /**
   * `UserController.edit()`
   */




   addnew: function (req, res) {
    var result = UserController.check(req, res);
      if(result)
        return res.badRequest(result);
             
     User.signup({firstname : req.body.firstname, lastname : req.body.lastname, email : req.body.email, rollnumber : req.body.rollnumber, password : req.body.password}, function(result, err){
        if(err)
          return res.negotiate(err);
        res.redirect('/show');
      });
      
  },



  getforupdate: function(req, res){
    if(!req.params.input)
      return res.badRequest({"message":"Not rollnumber"});
      
    User.get({rollnumber : req.params.input}, function(result, err){
      if(err)
        return res.negotiate(err);
      
      res.view("doupdate",{result:result});
    });
  },





  update: function (req, res) {
      if(!req.body.firstname)
          return res.badRequest({"message":"Not rollnumber"});
      
       User.edit(req , function(result, err){
          if(!err && result)
            res.redirect('/show');
          else
            res.negotiate(err);
        });
  },


  /**
   * `UserController.delete()`
   */
  delete: function (req, res) {
      if(!req.params.input)
        return res.badRequest({"message":"Not fund"});  
      
      User.del({rollnumber : req.params.input}, function(result, err){
          if(err)
            return res.negotiate(err);
          
          res.redirect('/show');         
        });   
  },



  check: function(req, res){
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var rollformat = /^[0-9]+$/;
            var firstnameformat = /^[a-zA-Z]+$/;
            var lastnameformat = /^[a-zA-Z]+$/;
            if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.rollnumber || !req.body.password)
                return ({"message" : "Details are missing"});
            else if(!req.body.firstname.match(firstnameformat))
                return ({"message" : "Enter valid First Name"});
            else if(!req.body.lastname.match(lastnameformat))
                return ({"message" : "Enter valid Last Name"});
            else if(!req.body.email.match(mailformat))
                return ({"message" : "Email not valid"});   
            else if(!req.body.rollnumber.match(rollformat))
                return ({"message" : "Enter valid rollnumber"});
            else if(req.body.password.length<5)
                return ({"message" : "Password length at least 6"}); 
            else
              return false;

  },

};


module.exports = UserController;