var express = require('express');
var router = express.Router();
const uid2 = require('uid2');
const token = uid2(32);
const Users = require('../models/users')
const Message = require('../models/messages')
require('../models/connexion')


router.post('/add/:token', (req, res) => {
    const message = req.body.message;
    Users.findOne({token: req.params.token}).then(data => {
      if(data !== null){
        console.log(data);
        if ( !(message === '') && message.length < 280) {
                const newMessage = new Message({
                idUser: data['_id'],
                  message: message ,
                  like: [],
                  dateCreation: new Date
                });
          
                newMessage.save().then(newDoc => {
                  res.json({ result: true, token: newDoc.token });
                });
              }
        }
    })

  });

  router.post('/like/:idMessage/:token', (req, res) => {
    const {idMessage, token} = req.params
    Users.find({token: token}).then(data => {
      const idUser = data['_id'];
  
      Message.updateOne({id: idMessage}, { $push: {like: idUser} }).then(
        data => {
          res.json({result: true})
        }
      )
    })
  })
  module.exports = router;
