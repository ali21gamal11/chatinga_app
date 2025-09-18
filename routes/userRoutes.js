const express = require('express');
const route = express.Router();
const { updateUser,deleteUser,createNewUSer,getAllUsers,getUserById } = require('../controller/userController');

/**
 * @desc get all users
 * @route api/user/
 * @method GET
 * @access public
*/
route.get('/',getAllUsers);

/**
 * @desc get user by id
 * @route api/message/:id
 * @method GET
 * @access public
*/
route.get('/:id',getUserById);

/**
 * @desc create a new user
 * @route api/message/
 * @method POST
 * @access public
*/
route.post('/',createNewUSer);

/**
 * @desc update user
 * @route api/user/:id
 * @method PUT
 * @access public
*/
route.put('/:id',updateUser);

/**
 * @desc delete a user
 * @route api/message/:id
 * @method DELETE
 * @access public
*/
route.delete('/:id',deleteUser);


module.exports = route
