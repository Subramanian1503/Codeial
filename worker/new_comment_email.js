const queue = require('../configs/kue');

const commentMailer = require('../mailer/comment_mailer');

queue.process("NewCommentEmail", (job, done) => {
    console.log(`Job of new comment email triggered: ${job.data}`);

    commentMailer.newCommentMailer(job.data);

    done();
})