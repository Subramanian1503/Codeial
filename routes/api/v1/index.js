const express = require('express');

const router = express.Router();

router.use("/posts", require("../v1/posts"));

router.use("/users", require("../v1/users"));

module.exports = router;