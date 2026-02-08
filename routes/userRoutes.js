const express = require('express');
const route = express.Router();
const {virfyToken} = require("../middleware/verifyToken");
const { updateUser,deleteUser,createNewUSer,getAllUsers,getUserById,updatebanList } = require('../controller/userController');



/**
 * @desc block/unblock friend
 * @route api/user/block
 * @method PUT
 * @access public
*/
route.put('/block',virfyToken,updatebanList);

/**
 * @desc get all users
 * @route api/user/
 * @method GET
 * @access public
*/
route.get('/',getAllUsers);

/**
 * @desc get user by id
 * @route api/user/:id
 * @method GET
 * @access public
*/
route.get('/:id',getUserById);

/**
 * @desc create a new user
 * @route api/user/
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
 * @route api/user/:id
 * @method DELETE
 * @access public
*/
route.delete('/:id',deleteUser);



module.exports = route
