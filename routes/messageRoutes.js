const express = require('express');
const route = express.Router();
const {virfyToken} = require("../middleware/verifyToken");
const { updateMessage,deleteMessage,createNewMessage,getAllMessages,getMessageById,likeDeletMessage,getChatMessages } = require('../controller/messageController');

/**
 * @desc get all messages
 * @route api/message/
 * @method GET
 * @access public
*/
route.get('/',virfyToken,getAllMessages);

/**
 * @desc get all messages between tow users
 * @route api/message/:id1:id2
 * @method GET
 * @access private
*/
route.get('/:id1/:id2',virfyToken,getChatMessages);

/**
 * @desc get message by id
 * @route api/message/:id
 * @method GET
 * @access public
*/
route.get('/:id',virfyToken,getMessageById);

/**
 * @desc create a new message
 * @route api/message/
 * @method POST
 * @access public
*/
route.post('/',virfyToken,createNewMessage);

/**
 * @desc update message
 * @route api/message/:id
 * @method PUT
 * @access public
*/
route.put('/:id',virfyToken,updateMessage);

/**
 * @desc message be like deleted
 * @route api/message/:id
 * @method PUT
 * @access public
*/
route.put('/likeDeleted/:id',virfyToken,likeDeletMessage);

/**
 * @desc delete a message
 * @route api/message/:id
 * @method DELETE
 * @access public
*/
route.delete('/:id',virfyToken,deleteMessage);


module.exports = route
