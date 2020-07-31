const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// router.get('/users', (req, res) => {
//   res.send('api users works');
// });
router.get('/users', users.findAll);
// router.get('/users/findByRole', users.findOne);
router.post('/users', users.create);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

module.exports = router;
