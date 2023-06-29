const kue = require('kue');

const newCommentEmailQueue = kue.createQueue();

module.exports = newCommentEmailQueue;