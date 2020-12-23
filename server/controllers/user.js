const User = require('../models/user');
const md5 = require('md5');
const utils = require('../utils');
var multer  = require('multer');
var fs  = require('fs');
const path = require('path');

exports.create = async function (req, res) {
  req.body.password = md5(req.body.password);
  let newUser = new User(req.body);
  if (!req.body.username.length) {
    res.status(400).send('Username can not be blank');
  } else if (!req.body.password.length) {
    res.status(400).send('Password can not be blank');
  } else if (await User.isUsernameTaken(req.body.username)) {
    res.status(400).send('Username already taken');
  } else {
    newUser.save(function (err, user) {
      if(err) {
        res.status(400).send('Username is not available');
      } else {
        res.status(200).send(user);
      }
    });
  }
};

exports.list = function (req, res) {
  const isAdmin = utils.getUserInfoFromToken(req);
  User.find({}).exec(function (err, users) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(users);
  })
};

exports.getUserInfo = function (req, res) {
  if (!checkEditAndGetUserPermission(req)) {
    res.status(403).send("Permission denied.");
  } else {
    User.findById(req.params.id).exec(function (err, user) {
      if (err) {
        res.status(500).send(err);
      }
      if (!user) {
        res.status(404).send('Not found');
      } else {
        res.status(200).send(user);
      }
    })
  }
};

exports.updateUserInfo = async function (req, res) {
  if (!checkEditAndGetUserPermission(req)) {
    res.status(403).send("Permission denied.");
  } else {
    let updatedInfo = {
      username: req.body.username,
      name: req.body.name,
      isAdmin: true
    }
    if (!req.body.username.length) {
      res.status(400).send('Username can not be blank');
    } else if (await User.isUsernameTaken(req.body.username)) {
      res.status(400).send('Username already taken');
    } else {
      User.updateOne({ _id: req.params.id }, updatedInfo).exec(function (err, user) {
        if (err) {
          res.status(500).send('Username is not available');
        }
        res.status(200).send(user);
      })
    }
  }
};

exports.deleteUser = function (req, res) {
  User.deleteOne({ _id: req.params.id }).exec(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('success');
  })
};

exports.changeProfilePicture = function (req, res) {
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let dir = path.join(__dirname, '..', 'avatar');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, req.params.id + '.jpeg');
    }
  });
  
  let upload = multer({ storage: storage}).single('avatar');
  
  upload(req, res, function (err) {
    if (err) {
      res.status(500).send("Something went wrong");
    }
    User.updateOne({ _id: req.params.id }, { img: req.params.id + '.jpg' }).exec(function (err, user) {
      if (err) {
        res.status(500).send("Something went wrong");
      } else
        res.status(200).send('Changed profile picture successfully');
    })
  });
}

function checkEditAndGetUserPermission (req) {
  const userInfo = utils.getUserInfoFromToken(req);
  if (userInfo.isAdmin) return true;
  else return req.params.id === userInfo._id;
}