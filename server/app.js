const express = require('express');
const app = express();
const path = require('path');

// Processes uploaded files
const multer  = require('multer')
const upload = multer({ dest: 'uploads/'})
const fs = require("fs");

//analyser
const analyser = require('./analyser');

app.use(require('body-parser').json())

app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.post('/api/analyze/file', upload.single('file'), (req, res, next)=>{
  const {file} = req;
  let data
  if(file){
    fs.readFile(file.path, 'utf8', (err, data)=>{
      data = analyser(JSON.parse(data));
      res.send(data);
      next(err)
    });
  }
  
});

app.post('/api/analyze', (req, res, next)=>{
  let data = analyser(req.body)
  res.send(data)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
