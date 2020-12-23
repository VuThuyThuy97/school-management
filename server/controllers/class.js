const Class = require('../models/class');
const utils = require('../utils');
const moment = require('moment');

exports.create = async function (req, res) {
  const canCreate = await timeAvailable(req.body.room, req.body.teacher, req.body.startTime, req.body.endTime)
  if (!canCreate) {
    res.status(400).send('Time is not available for this room or teacher');
  } else {
    if (!req.body.name.length) {
      res.status(400).send('Name can not be blank');
    } else if (await Class.isNameTaken(req.body.name)) {
      res.status(400).send('Name already taken');
    } else {
      newClass.save(function (err, newClass) {
        if(err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(newClass);
        }
      });
    }
  }
};

exports.list = function (req, res) {
  Class.find({}).populate('teacher').populate('room').exec(function (err, classes) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(classes);
  })
};

exports.getClassInfo = function (req, res) {
  Class.findById(req.params.id).populate('teacher').populate('room').exec(function (err, foundedClass) {
    if (err) {
      res.status(500).send(err);
    }
    if (!foundedClass) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send(foundedClass);
    }
  })
};

exports.updateClassInfo = async function (req, res) {
  const canUpdate = await timeAvailable(req.body.room, req.body.teacher, req.body.startTime, req.body.endTime)
  if (!canUpdate) {
    res.status(400).send('Time is not available for this room or teacher');
  } else {
    if (!req.body.name.length) {
      res.status(400).send('Name can not be blank');
    } else if (await Class.isNameTaken(req.body.name)) {
      res.status(400).send('Name already taken');
    } else {
      Class.updateOne({ _id: req.params.id }, req.body).populate('teacher').populate('room').exec(function (err, updatedClass) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(updatedClass);
      })
    }
  }
};

exports.deleteClass = function (req, res) {
  Class.deleteOne({ _id: req.params.id }).exec(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('success');
  })
};

exports.getAllClassByUser = function (req, res) {
  const userInfo = utils.getUserInfoFromToken(req);
  const time = req.query.time

  Class.find({ teacher: userInfo._id }).populate('teacher').populate('room').exec(function (err, classes) {
    if (err) {
      res.status(500).send(err);
    } else {
      const today = moment();
      let result = classes
      if (time === 'today')
        result = result.filter(c => today.isSame(c.startTime, 'd'));
      else if (time === 'past' )
        result = result.filter(c => today.isBefore(c.startTime, 'd'));
      else if (time === 'future')
        result = result.filter(c => today.isAfter(c.startTime, 'd'));
      res.status(200).send(result);
    }
  })
}

async function timeAvailable (roomId, teacherId, startTime, endTime) {
  const classesWithRoom = await Class.find({ room: roomId });
  const classesWithUser = await Class.find({ teacher: teacherId });
  let roomAvailable = true;
  let userAvailable = true;

  roomAvailable = !classesWithRoom.find(c => 
    moment(startTime).isBetween(c.startTime, c.endTime) || moment(endTime).isBetween(c.startTime, c.endTime) 
    || moment(startTime).isSame(c.startTime) || moment(endTime).isSame(c.endTime)
  )
  userAvailable = !classesWithUser.find(c => 
    moment(startTime).isBetween(c.startTime, c.endTime) || moment(endTime).isBetween(c.startTime, c.endTime) 
    || moment(startTime).isSame(c.startTime) || moment(endTime).isSame(c.endTime)
  );

  return roomAvailable && userAvailable;
}