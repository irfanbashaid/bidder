const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var fs = require('fs');
const User = mongoose.model('User');
const Game = mongoose.model('Game');
var IPFS = require('ipfs');
const _ipfs= new IPFS();

var emailid;
module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.publickey = req.body.publickey;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate Credentials Occured.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {    
    passport.authenticate('local', (err, user, info) => {
        emailid=req.body.email;            
        if (err) { return res.status(400).json(err); }
        else if (user.publickey != req.body.publickey){
        return res.status(404).json({ status: false, message: 'Invalid Credentials.'  });
        }
        // else if(!User.verifyPassword(password)){
        //     return res.status(404).json({ message: 'Wrong password.' });
        // }
        // else if(!user){
        //     return res.status(404).json({ message: 'Email is not registered.' });
        // }
        else if (user){ return res.status(200).json({ "token": user.generateJwt() });}
        else{ return res.status(404).json(info);}
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => { 
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });               
            }
            else{
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','publickey']) });
            }
        }
    );
}

module.exports.changepassword = (req, res, next) =>{ 
    console.log("changepass"+req.body.email);
User.findOne({"email":req.body.email},function(err,user){
    if (err){
        return res.status(404).json({ status: false, message: 'User record not found.' });               
    }

    else{
        if(!user.verifyPassword(req.body.passwordold)){ 
            console.log("wrong");
            
                return res.status(404).json({ status: false, message: 'User password is wrong.' });     
            }

            else{
                var _user = new User();
                console.log(user.email)
                console.log(req.body.password);
                
                User.findOneAndUpdate({'email':user.email},{$set:{"password":_user.encryptPassword(req.body.password)}},function(errr,userr){
                    if(!userr){
                        return res.status(404).json({ status: false, message: 'User record not found.' }); 
                    }                   
                    else if(userr) {
                        console.log("changed");
                        
                        return res.status(200).json(user);
                    }   
                })
            }
         }
      })
   }

module.exports.forgotpassword = (req, res, next) =>{
    console.log("in");
    var _user = new User();
    User.findOne({'email':req.body.email},function(err,user){
        if(!user){
            return res.status(404).json({ status: false, message: 'User record not found.' }); 
        }

        else if(user.publickey != req.body.publickey){
            return res.status(404).json({ status: false, message: 'User private key miss match.' }); 
        }          
        else {
            User.findOneAndUpdate({'email':user.email},{$set:{"password":_user.encryptPassword(req.body.password)}},function(errr,userr){
                if(!userr){
                    return res.status(404).json({ status: false, message: 'User record not found.' }); 
                }                  
                else {
                    console.log("success");                    
                    return res.status(200).json(user);
                }   
            })
        }
    })
 }

 module.exports.getAuctionById=(req,res,next)=>{
     console.log(req.body.auctionid);
     
    Game.findOne({"auctionid":req.body.auctionid},function(err,productDetail){
        if(!err){
            return res.json(productDetail);
        }
    })
  }


module.exports.changepublickey = (req,res,next)=>{
    User.findOneAndUpdate({'email':req.body.email},{$set:{'publickey':req.body.publickey}},function(err,user){
        if(!user){
            return res.status(404).json({ status: false, message: 'User record not found.' }); 
        }

        else if(err){
            return res.status(400).json(err);
        }

        else {
            return res.status(200).json(user);
        }        
     })
  }

module.exports.createAuction = ( req, res, next )=>{  

 fs.readFile(req.files[0].path, function (err, data) {

    console.log('Stored');
    
    
    _ipfs.files.add(data,function(error,files){
        if(!error){
         
                fs.unlinkSync(__dirname+'../../uploads/'+req.files[0].filename);
                console.log('Cleared...'); 
                res.json(files[0].hash);        
                // var Auction = new Game();
                // Game.find(function(errr,games){  
                //    var imgPath= req.file.path;
                //    console.log(imgPath)
                //    Auction.auctionid = games.length+1;
                // // Auction.productname = req.body.productname;
                // Auction.ipfshash = files[0].hash;
                // Auction.save(function(err,user){
                //     if (!err){
                //         console.log(user);
                //         console.log("hash successfully saved to db");
                        
                //         res.json(games.length+1);
                //     }
                // else {
                //     if (err.code == 11000)
                //         res.status(422).send(["Error Occured"]);
                //     else
                //         return next(err);
                //       }
                //      })
                //     })
                    }
        else{
            console.log(error) 
            }
        })
    })
 }
 module.exports.productdetailssave = ( req, res, next )=>{

  var Auction = new Game();
                Game.find(function(errr,games){  

                Auction.auctionid = games.length+1;
                Auction.productname = req.body.product_name;
                Auction.ipfshash =req.body.ipfs_hash;
                Auction.save(function(err,user){
                    if (!err){
                        console.log(user);
                        console.log("hash successfully saved to db");
                        
                        res.json(games.length+1);
                    }
                else {
                    if (err.code == 11000)
                        res.status(422).send(["Error Occured"]);
                    else
                        return next(err);
                      }
                     })
                    })



 }

// module.exports.createAuction = ( req, res, next )=>{  
//     console.log(req.body.path);
    
    
//      fs.readFile(req.body.path, function (err, data) {
    
//         console.log(data);
        
        
//         _ipfs.files.add(data,function(error,files){
//             if(!error){
             
//                 console.log(files[0].hash)         
//             }
//             else{
//                 console.log(error) 
//             }
           
//         var Auction = new Game();
//     Game.find(function(errr,games){  
//        var imgPath= req.file.path;
//        console.log(imgPath)
//        Auction.auctionid = games.length+1;
//     Auction.productname = req.body.productname;
//     Auction.ipfshash = files[0].hash;
//     Auction.save(function(err,user){
//         if (!err){
//             console.log(user);
//             res.send(user);
//         }
//     else {
//         if (err.code == 11000)
//             res.status(422).send(["Error Occured"]);
//         else
//             return next(err);
//           }
//          })
//         })  
//        })
//     })
//      }


// module.exports.productDetails = (req, res, next) =>{
//     Game.findOne({"auctionid":req.body.auctionid},function(err,productDetail){
//         var base64 = productDetail.img.data.toString('base64');
//         return res.json(productDetail.img.contentType+base64);
//     })    
//  }
module.exports.productDetails = (req, res, next) =>{
    Game.find(function(err,productsDetail){
        if(err){
            return res.status(400).json(err);
        }
 
        else {
            return res.status(200).json(productsDetail);
        }
    })
 }
 
 module.exports.productsDetails = (req, res, next) =>{
    Game.find(function(err,productsDetail){
        var base64 = productsDetail.img.data.toString('base64');
        return res.json({auctionid:productsDetail.auctionid,actionname:productsDetail.auctionname,name:productsDetail.productname,file:productsDetail.img.contentType+base64});
    })    
 }

 module.exports.getUserName=(req,res,next)=>{
    console.log(req.body.publickey);
 
    User.findOne({'publickey':req.body.publickey},function(err,userDetail){
        if(err){
            return res.status(400).json(err);
        }
        else {
            return res.status(200).json(userDetail);
        }
    })
 }
 
module.exports.userDetails = (req, res, next) =>{

    User.findOne({"email":emailid},function(err,userDetail){
        return res.json(userDetail);
    })    
  }

  module.exports.showselectedproducts = (req, res, next) =>{
    console.log(req.body);
    var stat;
    Game.findOne({"auctionid":req.body.auctionid},function(er,res){
      if(res["Auctionstatus"]==true){
    Game.findOneAndUpdate({"auctionid":req.body.auctionid},{$set:{Auctionstatus:false}},function(err,userDetail){
      if(err){
          return res.status(400).json(err);
      }
  })
}
else{
  Game.findOneAndUpdate({"auctionid":req.body.auctionid},{$set:{Auctionstatus:true}},function(err,userDetail){
      if(err){
          return res.status(400).json(err);
      }
  })
}

    })
    return res.status(200).json("successfully updated");
}