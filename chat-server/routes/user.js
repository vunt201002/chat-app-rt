const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.patch(
    '/update',
    authController.protect,
    userController.update
);

module.exports = router;