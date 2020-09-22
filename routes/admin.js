const router = require('express').Router();
const { AdminController } = require('../controllers');

router.post('/login', AdminController.login);
router.post('/register', AdminController.register);

module.exports = router;
