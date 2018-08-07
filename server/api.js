const router = require('express').Router();
const path = require('path');
const fs = require('fs');

// Processes uploaded files
const multer  = require('multer');
const upload = multer({ dest: 'uploads/'});

//analysis function
const analyser = require('./analyser');

//handles file creation for downloads
const fileHandler = require('./fileHandler');

router.post('/analyze/file', upload.single('file'), (req, res, next)=>{
  const {file} = req;
  if(file){
    fs.readFile(file.path, 'utf8', (err, data)=>{
      if(err) next(err)
      data = analyser(JSON.parse(data));
      res.send(data);
    });
  }
  
});

router.post('/analyze/JSON', (req, res, next)=>{
  let data = analyser(req.body)
  res.send(data)
})

router.post('/download/:type', (req, res, next)=>{
  let { data } = req.body;
  let type = req.params.type;
  fileHandler[type](data);
  res.download(path.join(__dirname, `../analysys.${type}`))
});

// Routes for downloaded from file upload (not yet implemented on front end)
router.post('/analyze/file/download/:type', upload.single('file'), (req, res, next)=>{
  const {file} = req;
  if(file){
    fs.readFile(file.path, 'utf8', (err, data)=>{
      if(err) next(err)
      data = analyser(JSON.parse(data));
      fileHandler[req.params.type](data)
      res.download(path.join(__dirname, `../analysys.${type}`));
    });
  }
});
router.post('/analyze/JSON/download/:type', (req, res, next)=>{
  let data = analyser(req.body)
  fileHandler[req.params.type](data)
  res.download(path.join(__dirname, `../analysys.${type}`));
})


module.exports = router