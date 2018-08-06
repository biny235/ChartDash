const express = require('express');
const app = express();
const path = require('path');

app.use(require('body-parser').json())

app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.use('/api', require('./api'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
