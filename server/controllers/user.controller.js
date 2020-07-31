var User = require('../models/user.model');

exports.findAll = (async (req, res) => {
  console.log('USERS::FIND_ALL', req.body);
  try {
    const users = await User.find({})
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

exports.create = (async (req, res) => {
  console.log('USERS::CREATE', req.body);
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).json({ error })
  }

})

exports.update = (async (req, res) => {
  console.log('USERS::UPDATE');
  console.log(req.params.id, req.body);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
});

// exports.findOne = ((req, res) => {
//   console.log('USERS::FIND_ONE');
//   User.find({ role: req.body.role }, function(err, user) {
//     if (err) throw err;

//     // object of the user
//     console.log(user);
//     res.json(user);
//   });
// })

exports.delete = (async (req, res) => {
  console.log('USERS::DELETE');
  console.log(req.params.id);
  try {
    const user = await User.findOne({ _id: req.params.id }).remove();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
