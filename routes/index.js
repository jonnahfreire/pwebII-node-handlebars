const express = require('express')
const path = require('path')


const router = express.Router();

const views = path.join(__dirname, "..", "views");

router.get("/", function(req, res){
    res.sendFile(path.join(views, "index.html"));
});


module.exports = router;