var express = require('express');
var router = express.Router();

const fs=require('fs')
const path=require('path')

const gpath=path.join(__dirname,'../','public','notes')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{files:''});
});

router.get('/files', function(req, res, next) {
const files=fs.readdirSync(path.join(gpath),"utf-8")

  res.render('files',{files: files });
});

router.get('/readmore', function(req, res, next) {
  res.render('readmore',{files:''});
});



router.get('/readmore/:filename', function(req, res, next) {
  const filedata=fs.readFileSync(path.join(gpath,req.params.filename),'utf8')
  res.redirect('readmore',{filename:req.params.filename,filedata: req.params.filedata});
});


//description or title dono sth  me use nhi ho rhe hai

router.post('/createfile', function(req, res, next) {
  const {filename}=req.body;
  const {detail}=req.body;
  fs.writeFileSync(path.join(gpath,filename,detail),'')
  res.redirect('/files');
});



module.exports = router;
