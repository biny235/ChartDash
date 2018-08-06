const router = require('express').Router();

// Processes uploaded files
const multer  = require('multer');
const upload = multer({ dest: 'uploads/'});
const fs = require('fs');

//analyser
const analyser = require('./analyser');

//process XML
const jsonxml = require('jsontoxml');
const xmlFormat = require('xml-formatter');

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

router.post('/analyze/JSON/download/:type', (req, res, next)=>{
  let {data} = req.body;
  let xml = jsonxml({node:'data', data});
  let formattedXml = xmlFormat(xml);
  fs.writeFile('analysys.xml', (err, file)=>{
    if(err) next(err);
    res.download(path.join(__dirname, '../analysys.xml'));
  })
})


module.exports = router