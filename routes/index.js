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

// router.get('/readmore', function(req, res, next) {
//   res.render('readmore',{files:''});
// });



router.get('/readmore/:filename', function(req, res, next) {
  const filedata=fs.readFileSync(path.join(gpath,req.params.filename),'utf8')
  res.render('readmore',{filename:req.params.filename,filedata: filedata});
 });
// router.get('/readmore/:filename', function(req, res, next) {
//   try {
//     const filePath = path.join(gpath, req.params.filename);
//     const filedata = fs.readFileSync(filePath, 'utf8');
//     res.render('readmore', { filename: req.params.filename, filedata: filedata });
//   } catch (err) {
//     next(err);  // Pass the error to the error handling middleware
//   }
// });


//description or title dono sth  me use nhi ho rhe hai

// router.post('/createfile', function(req, res, next) {
//   const {filename,detail}=req.body;

//   fs.writeFileSync(path.join(gpath,filename,detail),'')
//   res.redirect('/files');
// });


router.post('/createfile', function(req, res, next) {
  const { filename, detail } = req.body;

  try {
    fs.writeFileSync(path.join(gpath, filename), detail, 'utf8');
    res.redirect('/files');
  } catch (err) {
    res.send(err);  // Pass the error to the error handling middleware
  }
});

router.get('/edit/:filename', function(req, res, next) {
  res.render('edit',{filename:req.params.filename});
});


//rename file

router.post('/edit', function(req, res, next) {
 fs.renameSync(path.join(gpath,req.body.previous),path.join(gpath,req.body.new))
 res.redirect('/files');
});







module.exports = router;
