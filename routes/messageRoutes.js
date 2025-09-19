const express = require('express');
const route = express.Router();
const { updateMessage,deleteMessage,createNewMessage,getAllMessages,getMessageById,likeDeletMessage } = require('../controller/messageController');

/**
 * @desc get all messages
 * @route api/message/
 * @method GET
 * @access public
*/
route.get('/',getAllMessages);

/**
 * @desc get message by id
 * @route api/message/:id
 * @method GET
 * @access public
*/
route.get('/:id',getMessageById);

/**
 * @desc create a new message
 * @route api/message/
 * @method POST
 * @access public
*/
route.post('/',createNewMessage);

/**
 * @desc update message
 * @route api/message/:id
 * @method PUT
 * @access public
*/
route.put('/:id',updateMessage);

/**
 * @desc message be like deleted
 * @route api/message/:id
 * @method PUT
 * @access public
*/
route.put('/likeDeleted/:id',likeDeletMessage);

/**
 * @desc delete a message
 * @route api/message/:id
 * @method DELETE
 * @access public
*/
route.delete('/:id',deleteMessage);


module.exports = route
